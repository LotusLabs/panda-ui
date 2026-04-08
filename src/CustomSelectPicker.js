import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as StyledText from './StyledText';
import { usePickerSheet } from './contexts/PickerSheetContext';

const SELECT_NEXT_DEFAULTS = {
	placeholderColor: '#22282F',
	color: '#22282F',
	iconColor: '#3C7378',
	borderColor: '#D8D8D8',
	backgroundColor: '#fff',
	borderRadius: 8,
	fontSize: 14,
	height: 45,
	width: 175,
	paddingHorizontal: 10,
	iconSize: 20
};

const RESET_ITEM_KEY = '__customPickerReset';

function valuesEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	return String(a) === String(b);
}

function normalizeItems(items) {
	if (!items?.length) return [];
	return items.map(item => {
		if (item != null && typeof item === 'object' && 'label' in item && 'value' in item) {
			return { label: String(item.label), value: item.value };
		}
		return { label: String(item), value: item };
	});
}

function listKeyExtractor(item, index) {
	return item.key === RESET_ITEM_KEY ? RESET_ITEM_KEY : `${String(item.value)}-${index}`;
}

function CustomSelectPicker({
	items = [],
	value,
	onValueChange,
	onDonePress,
	placeholder = 'Select',
	placeholderBold = false,
	title,
	disabled = false,
	sheetHeightFraction = 0.5,
	style,
	anchorStyle,
	textStyle,
	width = SELECT_NEXT_DEFAULTS.width,
	placeholderColor = SELECT_NEXT_DEFAULTS.placeholderColor,
	color = SELECT_NEXT_DEFAULTS.color,
	iconColor = SELECT_NEXT_DEFAULTS.iconColor,
	borderColor = SELECT_NEXT_DEFAULTS.borderColor,
	backgroundColor = SELECT_NEXT_DEFAULTS.backgroundColor,
	borderRadius = SELECT_NEXT_DEFAULTS.borderRadius,
	fontSize = SELECT_NEXT_DEFAULTS.fontSize,
	height = SELECT_NEXT_DEFAULTS.height,
	paddingHorizontal = SELECT_NEXT_DEFAULTS.paddingHorizontal,
	separatorColor,
	border = true,
	containerStyle,
	touchableStyle,
	showResetOption = false,
	resetValue = null,
	resetLabel,
	rightIconSource,
	iconSize = SELECT_NEXT_DEFAULTS.iconSize,
	iconWidth = 16,
	iconHeight = 16,
	rightIconStyle,
	itemPressedBackgroundColor,
	itemSelectedBackgroundColor,
	testID
}) {
	const { present, dismiss, defaultItemPressedBackgroundColor, defaultItemSelectedBackgroundColor } = usePickerSheet();
	const normalized = useMemo(() => normalizeItems(items), [items]);
	const selectedItem = useMemo(() => normalized.find(row => valuesEqual(row.value, value)), [normalized, value]);

	const listItems = useMemo(() => {
		if (!showResetOption) return normalized;
		const label = resetLabel != null ? String(resetLabel) : placeholder;
		return [{ label, value: resetValue, key: RESET_ITEM_KEY }, ...normalized];
	}, [showResetOption, normalized, resetLabel, placeholder, resetValue]);

	const isAutoWidth = width === 'auto';

	const displayLabel = selectedItem?.label ?? (placeholder || '');
	const headerTitle = title ?? placeholder;
	const anchorTextColor = selectedItem ? color : placeholderColor;
	const iconTint = iconColor || anchorTextColor || placeholderColor;
	const rowPressedBgColor =
		itemPressedBackgroundColor || defaultItemPressedBackgroundColor || separatorColor || `${iconTint}22`;
	const rowSelectedBgColor =
		itemSelectedBackgroundColor || defaultItemSelectedBackgroundColor || separatorColor || `${iconTint}22`;

	const flatTextStyle = useMemo(() => {
		if (textStyle == null) return {};
		return StyleSheet.flatten(textStyle) || {};
	}, [textStyle]);
	const anchorFontSize = flatTextStyle.fontSize != null ? flatTextStyle.fontSize : fontSize;
	const anchorLabelColor = flatTextStyle.color != null ? flatTextStyle.color : anchorTextColor;

	const onPick = useCallback(
		item => {
			dismiss();
			onValueChange?.(item.value, item);
			onDonePress?.(item.value);
		},
		[dismiss, onValueChange, onDonePress]
	);

	const renderRow = useCallback(
		({ item }) => {
			const sel =
				item.key === RESET_ITEM_KEY
					? valuesEqual(value, resetValue)
					: Boolean(selectedItem && valuesEqual(item.value, selectedItem.value));
			return (
				<Pressable
					style={({ pressed }) => [
						styles.row,
						{ borderBottomColor: borderColor },
						pressed && { backgroundColor: rowPressedBgColor },
						sel && { backgroundColor: rowSelectedBgColor }
					]}
					onPress={() => onPick(item)}
				>
					<Text style={[styles.rowLabel, { color }, sel && { color: iconColor, fontWeight: '600' }]}>{item.label}</Text>
				</Pressable>
			);
		},
		[selectedItem, value, resetValue, onPick, borderColor, iconColor, color, rowPressedBgColor, rowSelectedBgColor]
	);

	const wrapperStyle = useMemo(
		() => ({
			...(isAutoWidth ? { alignSelf: 'flex-start', overflow: 'visible' } : { width, overflow: 'hidden' }),
			height,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor,
			borderWidth: border ? 1 : 0,
			borderColor: border ? borderColor : color,
			paddingHorizontal: 0,
			borderRadius,
			borderBottomWidth: border ? 1 : 0,
			borderBottomColor: separatorColor
		}),
		[isAutoWidth, width, height, backgroundColor, border, borderColor, color, borderRadius, separatorColor]
	);

	const openSheet = useCallback(() => {
		if (disabled) return;
		present({
			title: headerTitle,
			sheetHeightFraction,
			scrollable: true,
			accentColor: iconColor,
			children: (
				<View style={styles.list}>
					{listItems.map((item, index) => (
						<React.Fragment key={listKeyExtractor(item, index)}>{renderRow({ item })}</React.Fragment>
					))}
				</View>
			)
		});
	}, [disabled, present, headerTitle, sheetHeightFraction, iconColor, listItems, renderRow]);

	return (
		<View style={[wrapperStyle, containerStyle, style]} testID={testID}>
			<TouchableOpacity
				activeOpacity={0.7}
				disabled={disabled}
				onPress={openSheet}
				style={[
					{
						...(isAutoWidth ? { alignSelf: 'flex-start' } : { width }),
						height,
						paddingHorizontal,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					},
					disabled && styles.anchorDisabled,
					touchableStyle,
					anchorStyle
				]}
			>
				<StyledText.Body2
					style={{
						...(isAutoWidth ? styles.anchorLabelAuto : {}),
						...textStyle
					}}
					fontSize={anchorFontSize}
					textColor={anchorLabelColor}
				>
					{displayLabel}
				</StyledText.Body2>
				<View style={styles.iconChevronWrap}>
					{rightIconSource ? (
						<Image
							source={rightIconSource}
							style={[
								styles.icon,
								{ width: iconWidth || 20, height: iconHeight || 20, tintColor: iconTint },
								rightIconStyle
							]}
							resizeMode="contain"
						/>
					) : (
						<MaterialIcons name="keyboard-arrow-down" size={iconSize} color={iconTint} />
					)}
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	anchorLabelAuto: {
		flexShrink: 0,
		flexGrow: 0
	},
	anchorDisabled: {
		opacity: 0.5
	},
	iconChevronWrap: {
		marginLeft: 10
	},
	icon: {
		flexShrink: 0
	},
	list: {
		paddingVertical: 8
	},
	row: {
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	rowLabel: {
		fontSize: 16
	}
});

export default CustomSelectPicker;
