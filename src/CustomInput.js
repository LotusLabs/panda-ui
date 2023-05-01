import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import TouchableIcon from './TouchableIcon';

function CustomInput(props) {
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
		ref,
		disableFullscreenUI,
		autoCapitalize,
		leftIconSource,
		rightIconSource,
		onPressLeftIcon,
		onPressRightIcon,
		rightIconColor,
		leftIconColor,
		height = 20,
		width = 20
	} = props;

	return (
		<View style={[styles.flexStyle, containerStyle]}>
			{leftIconSource && (
				<TouchableIcon
					resizeMode="contain"
					source={leftIconSource}
					height={height}
					width={width}
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
				ref={ref}
				returnKeyType={returnKeyType} // ('done', 'go', 'next', 'search', 'send')
				disableFullscreenUI={disableFullscreenUI}
				autoCapitalize={autoCapitalize}
				keyboardType={keyboardType}
			/>
			{rightIconSource && (
				<TouchableIcon
					resizeMode="contain"
					source={rightIconSource}
					height={height}
					width={width}
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
		paddingHorizontal: 15,
		paddingLeft: 15,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#D8D8D8'
	}
});

export default CustomInput;
