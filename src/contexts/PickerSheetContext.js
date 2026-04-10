import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ScrollView,
	useWindowDimensions,
	Platform,
	BackHandler,
	TouchableOpacity
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SHEET_OPEN_MS = 280;
const SHEET_CLOSE_MS = 220;
const SHEET_FR_MIN = 0.3;
const SHEET_FR_MAX = 0.9;

const SHEET_HEADER_FALLBACK = 52;

function clampSheetFraction(f) {
	return Math.min(Math.max(f, SHEET_FR_MIN), SHEET_FR_MAX);
}

const PickerSheetContext = createContext(null);

export function PickerSheetProvider({
	children,
	defaultItemPressedBackgroundColor,
	defaultItemSelectedBackgroundColor
} = {}) {
	const insets = useSafeAreaInsets();
	const { height: windowHeight } = useWindowDimensions();
	const [layer, setLayer] = useState(null);

	const backdropOpacity = useSharedValue(0);
	const sheetTranslateY = useSharedValue(0);

	const layerRef = useRef(null);
	layerRef.current = layer;

	const dismissingRef = useRef(false);
	const openIdRef = useRef(0);
	const measuredSheetHeightRef = useRef(0);
	const sheetOpeningAnimatedRef = useRef(false);
	const [headerHeight, setHeaderHeight] = useState(SHEET_HEADER_FALLBACK);

	const finishDismiss = useCallback(() => {
		const snap = layerRef.current;
		const onDismiss = snap?.onDismiss;
		dismissingRef.current = false;
		setLayer(null);
		onDismiss?.();
	}, []);

	const dismissAnimated = useCallback(() => {
		const current = layerRef.current;
		if (!current) return;
		const h = current.dynamicHeight
			? measuredSheetHeightRef.current > 0
				? measuredSheetHeightRef.current
				: current.sheetMaxHeight
			: current.sheetHeight;
		backdropOpacity.value = withTiming(0, { duration: SHEET_CLOSE_MS, easing: Easing.out(Easing.cubic) });
		sheetTranslateY.value = withTiming(h, { duration: SHEET_CLOSE_MS, easing: Easing.in(Easing.cubic) }, done => {
			if (done) runOnJS(finishDismiss)();
		});
	}, [backdropOpacity, sheetTranslateY, finishDismiss]);

	const dismiss = useCallback(() => {
		if (!layerRef.current || dismissingRef.current) return;
		dismissingRef.current = true;
		dismissAnimated();
	}, [dismissAnimated]);

	const present = useCallback(
		({
			title,
			children: body,
			scrollable = true,
			sheetHeightFraction = 0.5,
			accentColor,
			onDismiss,
			dynamicHeight
		}) => {
			const fr = clampSheetFraction(sheetHeightFraction);
			const sheetMaxHeight = Math.round(windowHeight * fr);
			const useDynamic = dynamicHeight !== false;
			openIdRef.current += 1;
			setLayer({
				openId: openIdRef.current,
				title: title ?? '',
				children: body,
				scrollable,
				sheetHeight: sheetMaxHeight,
				sheetMaxHeight,
				dynamicHeight: useDynamic,
				accentColor: accentColor ?? '#195A9A',
				onDismiss
			});
		},
		[windowHeight]
	);

	useLayoutEffect(() => {
		if (!layer) {
			dismissingRef.current = false;
			sheetOpeningAnimatedRef.current = false;
			measuredSheetHeightRef.current = 0;
			return;
		}
		if (layer.dynamicHeight) {
			measuredSheetHeightRef.current = 0;
			sheetOpeningAnimatedRef.current = false;
			setHeaderHeight(SHEET_HEADER_FALLBACK);
			sheetTranslateY.value = layer.sheetMaxHeight;
			backdropOpacity.value = 0;
			return;
		}
		const h = layer.sheetHeight;
		sheetTranslateY.value = h;
		backdropOpacity.value = 0;
		const t = requestAnimationFrame(() => {
			sheetTranslateY.value = withTiming(0, { duration: SHEET_OPEN_MS, easing: Easing.out(Easing.cubic) });
			backdropOpacity.value = withTiming(1, { duration: SHEET_OPEN_MS, easing: Easing.out(Easing.cubic) });
		});
		return () => cancelAnimationFrame(t);
	}, [layer, sheetTranslateY, backdropOpacity]);

	const onDynamicSheetLayout = useCallback(
		e => {
			if (!layer?.dynamicHeight) return;
			const h = Math.ceil(e.nativeEvent.layout.height);
			if (h < 1) return;
			measuredSheetHeightRef.current = h;
			if (sheetOpeningAnimatedRef.current) return;
			sheetOpeningAnimatedRef.current = true;
			sheetTranslateY.value = h;
			requestAnimationFrame(() => {
				sheetTranslateY.value = withTiming(0, { duration: SHEET_OPEN_MS, easing: Easing.out(Easing.cubic) });
				backdropOpacity.value = withTiming(1, { duration: SHEET_OPEN_MS, easing: Easing.out(Easing.cubic) });
			});
		},
		[layer, sheetTranslateY, backdropOpacity]
	);

	useEffect(() => {
		if (!layer || Platform.OS !== 'android') return undefined;
		const sub = BackHandler.addEventListener('hardwareBackPress', () => {
			dismiss();
			return true;
		});
		return () => sub.remove();
	}, [layer, dismiss]);

	const backdropStyle = useAnimatedStyle(() => ({
		opacity: backdropOpacity.value
	}));

	const sheetStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: sheetTranslateY.value }]
	}));

	const value = useMemo(
		() => ({
			present,
			dismiss,
			defaultItemPressedBackgroundColor,
			defaultItemSelectedBackgroundColor
		}),
		[present, dismiss, defaultItemPressedBackgroundColor, defaultItemSelectedBackgroundColor]
	);

	const maxContentHeight = useMemo(() => {
		if (!layer) return 120;
		return Math.max(120, layer.sheetMaxHeight - headerHeight - Math.max(insets.bottom, 12));
	}, [layer, headerHeight, insets.bottom]);

	return (
		<PickerSheetContext.Provider value={value}>
			<View style={styles.flex} collapsable={false}>
				{children}
				{layer ? (
					<View style={styles.overlayRoot} pointerEvents="box-none" collapsable={false}>
						<Animated.View style={[styles.backdrop, backdropStyle]} pointerEvents="box-none">
							<Pressable style={StyleSheet.absoluteFill} onPress={dismiss} accessibilityRole="button" />
						</Animated.View>
						<Animated.View
							onLayout={layer.dynamicHeight ? onDynamicSheetLayout : undefined}
							style={[
								styles.sheet,
								sheetStyle,
								layer.dynamicHeight
									? { maxHeight: layer.sheetMaxHeight, paddingBottom: Math.max(insets.bottom, 12) }
									: { height: layer.sheetHeight, paddingBottom: Math.max(insets.bottom, 12) }
							]}
						>
							<View style={styles.header} onLayout={e => setHeaderHeight(Math.ceil(e.nativeEvent.layout.height))}>
								<Text style={styles.headerTitle} numberOfLines={1}>
									{layer.title}
								</Text>
								<TouchableOpacity onPress={dismiss} hitSlop={12} accessibilityLabel="Close">
									<MaterialIcons name="close" size={24} color={'#22282F'} />
								</TouchableOpacity>
							</View>
							{layer.scrollable ? (
								<ScrollView
									keyboardShouldPersistTaps="handled"
									style={[
										layer.dynamicHeight ? styles.scrollDynamic : styles.scroll,
										layer.dynamicHeight && { maxHeight: maxContentHeight }
									]}
									contentContainerStyle={[styles.scrollContent, layer.dynamicHeight && styles.scrollContentDynamic]}
								>
									{layer.children}
								</ScrollView>
							) : (
								<View
									style={[
										layer.dynamicHeight ? styles.bodyDynamic : styles.body,
										layer.dynamicHeight && { maxHeight: maxContentHeight }
									]}
								>
									{layer.children}
								</View>
							)}
						</Animated.View>
					</View>
				) : null}
			</View>
		</PickerSheetContext.Provider>
	);
}

export function usePickerSheet() {
	const ctx = useContext(PickerSheetContext);
	if (!ctx) {
		throw new Error('usePickerSheet must be used within PickerSheetProvider');
	}
	return ctx;
}

const styles = StyleSheet.create({
	flex: {
		flex: 1
	},
	overlayRoot: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		zIndex: 100000
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	sheet: {
		width: '100%',
		backgroundColor: '#fff',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		overflow: 'hidden'
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#D8D8D8'
	},
	headerTitle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '600',
		color: '#22282F',
		marginRight: 12
	},
	close: {
		fontSize: 22,
		fontWeight: '300'
	},
	scroll: {
		flex: 1
	},
	scrollDynamic: {
		flexGrow: 0,
		flexShrink: 1
	},
	scrollContent: {
		paddingVertical: 8,
		flexGrow: 1
	},
	scrollContentDynamic: {
		flexGrow: 0
	},
	body: {
		flex: 1,
		minHeight: 0
	},
	bodyDynamic: {
		flexGrow: 0,
		flexShrink: 1
	}
});
