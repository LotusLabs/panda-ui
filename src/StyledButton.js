import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import * as StyledText from './StyledText';
import PropTypes from 'prop-types';

function StyledButton({
	title,
	onPress,
	titleSize,
	containerStyle,
	disabled = false,
	opacity = 1,
	backgroundColor,
	onPressedBackgroundColor,
	iconElement,
	textColor,
	fontWeight = '600'
}) {
	const sizeOverride = titleSize
		? { fontSize: titleSize, lineHeight: titleSize + 3, fontWeight: fontWeight }
		: { fontWeight: fontWeight };
	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				containerStyle,
				{
					backgroundColor: pressed
						? onPressedBackgroundColor || Colors.light.buttonOnFocusColor
						: backgroundColor || Colors.light.buttonColor
				}
			]}
			onPress={onPress}
			disabled={disabled}
			opacity={opacity}
		>
			{iconElement ? iconElement : null}
			<StyledText.Body1 style={sizeOverride} textColor={textColor || Colors.light.buttonTextColor}>
				{title}
			</StyledText.Body1>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 175,
		height: 45,
		borderRadius: 8
	}
});

export default StyledButton;

StyledButton.propTypes = {
	onPress: PropTypes.func,
	iconElement: PropTypes.element,
	disabled: PropTypes.bool,
	containerStyle: PropTypes.object,
	titleSize: PropTypes.number,
	opacity: PropTypes.number,
	title: PropTypes.string,
	backgroundColor: PropTypes.string,
	onPressedBackgroundColor: PropTypes.string,
	textColor: PropTypes.string,
	fontWeight: PropTypes.string
};
