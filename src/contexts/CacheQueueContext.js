import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';

export const CacheQueueContext = createContext();

export const CacheQueueContextProvider = ({ children, storageKey = 'CACHE_QUEUE', getItem, setItem }) => {
	const [queue, setQueue] = useState([]);
	const queueRef = useRef([]);

	useEffect(() => {
		loadQueue();
	}, [loadQueue]);

	const createQueueItem = payload => ({
		id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
		type: payload.type,
		payload: payload.payload,
		createdAt: Date.now(),
		retryCount: 0
	});

	const saveQueue = useCallback(
		async nextQueue => {
			const data = Array.isArray(nextQueue) ? nextQueue : [];
			queueRef.current = data;
			setQueue(data);
			await setItem(storageKey, data);
			return data;
		},
		[storageKey, setItem]
	);

	const loadQueue = useCallback(async () => {
		const savedQueue = await getItem(storageKey);
		return saveQueue(savedQueue);
	}, [saveQueue, storageKey, getItem]);

	const addToQueue = useCallback(
		async job => {
			let item = job;
			if (!item?.id || !item?.payload) {
				item = createQueueItem(job);
			}
			await saveQueue([...queueRef.current, item]);
			return item;
		},
		[saveQueue]
	);

	const removeFromQueue = useCallback(
		async itemId => {
			if (!itemId) {
				return;
			}
			await saveQueue(queueRef.current.filter(item => item.id !== itemId));
		},
		[saveQueue]
	);

	const updateInQueue = useCallback(
		async (itemId, onUpdateQueueItem) => {
			if (!itemId) {
				return null;
			}

			let updatedItem = null;
			const nextQueue = queueRef.current.map(item => {
				if (item.id !== itemId) {
					return item;
				}
				updatedItem = onUpdateQueueItem(item);
				return updatedItem;
			});

			if (!updatedItem) {
				return null;
			}
			await saveQueue(nextQueue);
			return updatedItem;
		},
		[saveQueue]
	);

	return (
		<CacheQueueContext.Provider
			value={{
				queue,
				addToQueue,
				removeFromQueue,
				updateInQueue
			}}
		>
			{children}
		</CacheQueueContext.Provider>
	);
};
