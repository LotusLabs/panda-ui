import React, { createContext, useCallback, useEffect, useState } from 'react';

export const CacheQueueContext = createContext();

export const CacheQueueContextProvider = ({ children, storageKey = 'CACHE_QUEUE', getItem, setItem }) => {
	const [queue, setQueue] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const loadQueue = useCallback(async () => {
		const savedQueue = await getItem(storageKey);
		setQueue(Array.isArray(savedQueue) ? savedQueue : []);
		setIsLoaded(true);
	}, [getItem, storageKey]);

	useEffect(() => {
		loadQueue();
	}, [loadQueue]);

	useEffect(() => {
		if (!isLoaded) {
			return;
		}
		setItem(storageKey, queue);
	}, [queue, isLoaded, storageKey, setItem]);

	const createQueueItem = payload => ({
		id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
		type: payload.type,
		payload: payload.payload,
		createdAt: Date.now(),
		retryCount: 0
	});

	const addToQueue = useCallback(job => {
		const item = job?.id && job?.payload ? job : createQueueItem(job);
		setQueue(prevQueue => [...prevQueue, item]);
		return item;
	}, []);

	const removeFromQueue = useCallback(itemId => {
		if (!itemId) {
			return;
		}
		setQueue(prevQueue => prevQueue.filter(item => item.id !== itemId));
	}, []);

	const removeManyFromQueue = useCallback(itemIds => {
		setQueue(prevQueue => prevQueue.filter(item => !itemIds.includes(item.id)));
	}, []);

	return (
		<CacheQueueContext.Provider
			value={{
				queue,
				addToQueue,
				removeFromQueue,
				removeManyFromQueue
			}}
		>
			{children}
		</CacheQueueContext.Provider>
	);
};
