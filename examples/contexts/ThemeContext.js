import React, { useReducer, useContext, useCallback, useLayoutEffect } from 'react';
import { setSessionState } from '../utils/apiHandler';

const ThemeContext = React.createContext();

const initialState = {
	id: 0,
	theme: 'default',
	animal: '',
	inverted: false,
	gradient: false
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_THEME':
			return {
				...state,
				...action.payload
			};

		default:
			throw new Error(`Unrecognized action type: ${action.type}`);
	}
};

export const ThemeContextProvider = ({ children }) => {
	const [userSession, dispatch] = useReducer(reducer, initialState);

	// We want to store the state and dispatch function on context, which requires some
	// kind of container. We'll use an array, in combination with useCallback to ensure
	// the array reference only changes when the reducer state changes.
	const reducerTuple = useCallback(
		[userSession, dispatch],
		[userSession]
	);

	// Syncronizes session state to `apiHandler` module so it can access the
	// state from outside of the react tree. It's the only module that should need this
	// syncronization.
	// Why we're using `useLayoutEffect` instead of `useEffect`: Some child components
	// will use `useEffect` to send API requests on mount. `useEffect` runs in child
	// components before it runs in parent components (like this one). So those API
	// requests will attempt to read session state that hasn't been syncronized yet.
	// To ensure we syncronize the session state before any child `useEffect` hooks run,
	// we'll use `useLayoutEffect` here, which is syncronous. This works as long as no
	// child components make API requests inside `useLayoutEffect` hooks themselves.
	// This is a safe assumption because there is never a good reason to use a syncronous
	// effect to start an asyncronous process like an API request.
	useLayoutEffect(() => {
		setSessionState(userSession);
	}, [userSession]);

	return (
		<ThemeContext.Provider value={reducerTuple}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => {
	const userSession = useContext(ThemeContext);
	if (userSession === undefined) {
		throw new Error('useThemeContext() hook could not read expected context. Did you forget to render <ThemeContextProvider> above it?');
	}
	return userSession;
};


export const characterSelector = state => state;
export const baseThemeSelector = state => state.theme;
export const invertedSelector = state => state.inverted;
export const gradientSelector = state => state.gradient;
export const themeSelector = state => state.inverted && state.gradient
	? `${state.theme}InvertedGradient` : state.inverted
		? `${state.theme}Inverted` : state.gradient
			? `${state.theme}Gradient` : state.theme;


// Using the state (with a custom selector) directly.
//
// const SuperSimpleExample1 = (props) => {
// 	const [userSession] = useThemeContext();
// 	const loggedIn = isLoggedInSelector(userSession);
// 	return <View>Is Logged In: {loggedIn ? 'Yes' : 'No'}</View>;
// };


// Using a custom hook (can be useful for specific repetative use cases).
//
// export const useLoggedIn = () => {
// 	const [userSession] = useThemeContext();
// 	return isLoggedInSelector(userSession);
// };
//
// const SuperSimpleExample2 = (props) => {
// 	const loggedIn = useLoggedIn();
// 	return <View>Is Logged In: {loggedIn ? 'Yes' : 'No'}</View>;
// };


