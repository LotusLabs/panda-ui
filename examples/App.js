import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform, LogBox, Image, Alert } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';

import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

import { configureFontAwesomePro } from 'react-native-fontawesome-pro';
import chroma from 'chroma-js';

import Colors from './constants/Colors';
// import { ToastContextProvider } from './contexts/ToastContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import {
	useThemeContext,
	themeSelector
} from './contexts/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import ErrorFallback from './components/ErrorFallback';
import ThemeSelect from './components/ThemeSelect';
import Layout from './constants/Layout';

const errorBoundaryHandler = (error, info) => {
	// TODO: send error
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function AppWrap() {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onError={errorBoundaryHandler}
		>
			<ThemeContextProvider>
				<App />
			</ThemeContextProvider>
		</ErrorBoundary>
	);
}

function App() {
	const [appIsReady, setAppIsReady] = useState(false);
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
		'Warning: componentWillReceiveProps has been renamed',
		`EventEmitter.removeListener('url', ...): Method has been deprecated`
	]);
	// ------- END OF WARNING SUPPRESSION


	useEffect(() => {
		async function prepare() {
			try {
				configureFontAwesomePro();
				// Pre-load fonts, make any API calls you need to do here
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const hasGradient = Colors[theme].statusBarGradient && Colors[theme].statusBarGradient.length > 1;
	const statusBarStyle = hasGradient ? chroma.contrast(Colors[theme].statusBarGradient[0], '#fff') > 5
		? 'light' : 'dark' :
		chroma.contrast(Colors[theme].statusBarColor, '#fff') > 5
			? 'light' : 'dark';

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<View
			style={container}
			onLayout={onLayoutRootView}
		>
			{ hasGradient ?
				(
					<>
						<LinearGradient
							colors={Colors[theme].statusBarGradient}
							start={[0, 0]}
							end={[1, 1]}
							style={{
								width: '100%',
								height: Constants.statusBarHeight
							}}
						>
							<StatusBar
								translucent={true}
								backgroundColor={'transparent'}
								style={statusBarStyle}
							/>
						</LinearGradient>
						<View style={{ marginHorizontal: 10, marginTop: Layout.screen.width > 360 ? 30 : 0, alignItems: 'center' }}>
							<Image
								source={require('./assets/panda-ui-logo.png')}
								style={{ height: 150, resizeMode: 'contain' }}
							/>
							<ThemeSelect />
						</View>
					</>
				) : (
					<>
						<View style={{ height: Platform.OS === 'ios' ? 40 : 0, backgroundColor: Colors[theme].statusBarColor }}>
							<StatusBar
								translucent={false}
								backgroundColor={Colors[theme].statusBarColor}
								style={statusBarStyle}
							/>
						</View>
						<View style={{ marginHorizontal: 10, marginTop: Layout.screen.width > 360 ? 30 : 0, alignItems: 'center' }}>
							<Image
								source={require('./assets/panda-ui-logo.png')}
								style={{ height: 150, resizeMode: 'contain' }}
							/>
							<ThemeSelect />
							<View style={{ marginBottom: Layout.screen.width > 360 ? 30 : 0 }} />
						</View>
					</>
				)
			}
			<AppNavigator />
		</View>
	);
}
