import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import TouchableIcon from './TouchableIcon';

function TextInputNext(props) {
	const {
		value,
		containerStyle,
		inputStyle,
		placeholder,
		placeholderTextColor = 'rgba(0,0,0,0.5)',
		backgroundColor = '#fff',
		onChangeText,
		onSubmitEditing,
		autoFocus,
		editable,
		maxLength,
		multiline,
		keyboardType,
		textAlign,
		autoCompleteType,
		secureTextEntry,
		returnKeyType,
		disableFullscreenUI,
		autoCapitalize,
		leftIconSource,
		rightIconSource,
		onPressLeftIcon,
		onPressRightIcon,
		rightIconColor,
		leftIconColor,
		iconHeight = 20,
		iconWidth = 20,
		innerRef
	} = props;

	return (
		<View style={[styles.flexStyle, containerStyle]}>
			{leftIconSource && (
				<TouchableIcon
					resizeMode="contain"
					source={leftIconSource}
					height={iconHeight}
					width={iconWidth}
					imageStyle={{
						position: 'absolute',
						left: 10,
						tintColor: leftIconColor
					}}
					onPress={onPressLeftIcon}
					touchableStyle={{ justifyContent: 'center' }}
				/>
			)}
			<TextInput
				ref={innerRef}
				value={value}
				style={[styles.inputContainer, inputStyle]}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				autoCompleteType={autoCompleteType}
				secureTextEntry={secureTextEntry}
				onChangeText={onChangeText}
				backgroundColor={backgroundColor}
				onSubmitEditing={onSubmitEditing}
				autoFocus={autoFocus}
				editable={editable}
				maxLength={maxLength}
				multiline={multiline}
				textAlign={textAlign}
				returnKeyType={returnKeyType} // ('done', 'go', 'next', 'search', 'send')
				disableFullscreenUI={disableFullscreenUI}
				autoCapitalize={autoCapitalize}
				keyboardType={keyboardType}
			/>
			{rightIconSource && (
				<TouchableIcon
					resizeMode="contain"
					source={rightIconSource}
					height={iconHeight}
					width={iconWidth}
					imageStyle={{
						position: 'absolute',
						right: 15,
						tintColor: rightIconColor
					}}
					onPress={onPressRightIcon}
					touchableStyle={{ justifyContent: 'center' }}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	flexStyle: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputContainer: {
		width: '100%',
		height: 45,
		zIndex: -1,
		paddingHorizontal: 5,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#D8D8D8'
	}
});

export default TextInputNext;

TextInputNext.propTypes = {
	value: PropTypes.string,
	placeholder: PropTypes.string,
	autoCompleteType: PropTypes.string,
	keyboardType: PropTypes.string,
	textAlign: PropTypes.string,
	secureTextEntry: PropTypes.bool,
	returnKeyType: PropTypes.string,
	inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	autoFocus: PropTypes.bool,
	editable: PropTypes.bool,
	disableFullscreenUI: PropTypes.bool,
	multiline: PropTypes.bool,
	autoCapitalize: PropTypes.bool,
	onChangeText: PropTypes.func,
	onSubmitEditing: PropTypes.func,
	leftIconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
	rightIconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
	onPressLeftIcon: PropTypes.func,
	onPressRightIcon: PropTypes.func,
	placeholderTextColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	rightIconColor: PropTypes.string,
	leftIconColor: PropTypes.string,
	maxLength: PropTypes.number,
	iconHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	iconWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })])
};
