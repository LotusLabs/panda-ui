import React, { useState } from 'react';
import { View, Platform, LogBox } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';

// import { Asset } from 'expo-asset';
import AppLoadingIndicator from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

import chroma from 'chroma-js';

import Colors from './constants/Colors';
import { ToastContextProvider } from './contexts/ToastContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { useThemeContext, themeSelector } from './contexts/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import ErrorFallback from './components/ErrorFallback';

const errorBoundaryHandler = (error, info) => {
	// TODO: send error
};

export default function AppWrap() {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback} onError={errorBoundaryHandler}>
			<ThemeContextProvider>
				<App />
			</ThemeContextProvider>
		</ErrorBoundary>
	);
}

function App() {
	const [isLoadingIndicatorComplete, setLoadingComplete] = useState(false);
	const [userSession] = useThemeContext();

	const theme = themeSelector(userSession);

	const container = {
		flex: 1,
		height: '100%',
		backgroundColor: Colors[theme].backgroundColor
	};

	// @TODO: This is to hide a Warning caused by NativeBase after upgrading to RN 0.62
	LogBox.ignoreLogs([
		'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
		'Warning: componentWillMount is deprecated',
		'Warning: componentWillUpdate is deprecated',
		'Warning: componentWillUnmount is deprecated',
		'Warning: componentWillReceiveProps is deprecated',
		'Warning: componentWillReceiveProps has been renamed'
	]);
	// ------- END OF WARNING SUPPRESSION

	const hasGradient = Colors[theme].statusBarGradient && Colors[theme].statusBarGradient.length > 1;
	const statusBarStyle = hasGradient
		? chroma.contrast(Colors[theme].statusBarGradient[0], '#fff') > 5
			? 'light'
			: 'dark'
		: chroma.contrast(Colors[theme].statusBarColor, '#fff') > 5
		? 'light'
		: 'dark';

	if (!isLoadingIndicatorComplete) {
		return (
			<AppLoadingIndicator
				startAsync={loadResourcesAsync}
				onError={handleLoadingIndicatorError}
				onFinish={() => handleFinishLoadingIndicator(setLoadingComplete)}
			/>
		);
	}

	return (
		<View style={container}>
			{hasGradient ? (
				<LinearGradient
					colors={Colors[theme].statusBarGradient}
					start={[0, 0]}
					end={[1, 1]}
					style={{
						width: '100%',
						height: Constants.statusBarHeight
					}}
				>
					<StatusBar translucent={true} backgroundColor={'transparent'} style={statusBarStyle} />
				</LinearGradient>
			) : (
				<View style={{ height: Platform.OS === 'ios' ? 40 : 0, backgroundColor: Colors[theme].statusBarColor }}>
					<StatusBar translucent={false} backgroundColor={Colors[theme].statusBarColor} style={statusBarStyle} />
				</View>
			)}
			<ToastContextProvider>
				<AppNavigator />
			</ToastContextProvider>
		</View>
	);
}

async function loadResourcesAsync() {
	// await Promise.all([
	// 	Asset.loadAsync([
	// 		require('./assets/images/panda.svg'),
	// 		require('./assets/images/redpanda.svg')
	// 	])
	// ]);
	return true;
}

function handleLoadingIndicatorError(error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error);
}

function handleFinishLoadingIndicator(setLoadingComplete) {
	setLoadingComplete(true);
}
