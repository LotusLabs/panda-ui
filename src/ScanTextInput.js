import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
	View,
	StyleSheet,
	Keyboard,
	Platform,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '@expo/vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';

import TextInput from './TextInput';

const ScanTextInput = props => {
	const {
		style,
		onSubmit,
		autoFocus = true,
		showKeyboardIcon = true,
		showBarCodeIcon = false,
		validate = false,
		overrideValue,
		clearOnSubmit = true,
		borderRadius = 4,
		placeholderTextColor = 'grey',
		activeKeyboardIconColor = 'green',
		inactiveKeyboardIconColor = 'white',
		textElement,
		width,
		height,
		...inputProps
	} = props;

	const [value, setValue] = useState('');
	const [showKeyboard, setShowKeyboard] = useState(true);
	const [validated, setValidated] = useState(!validate);
	const isFocused = useIsFocused();

	let _textInput = useRef(null);

	const inputStyle = {
		width: '100%',
		height: 50,
		borderWidth: 1,
		...style,
		borderRadius: borderRadius
	};

	const handleSubmit = () => {
		clearOnSubmit && validated && setValue('');
		clearOnSubmit && validated && _textInput.current.clear();
		return validated && onSubmit(value);
	};

	const setFocus = useCallback(() => {
		_textInput.current.focus();
		setShowKeyboard(true);
	}, []);

	const setBlur = () => {
		Keyboard.dismiss();
		setShowKeyboard(false);
	};

	useEffect(() => {
		if (overrideValue) {
			setValue(overrideValue);
		}
	}, [overrideValue]);

	useEffect(() => {
		if (isFocused && autoFocus) {
			setFocus(true);
		}
	}, [isFocused, setFocus, autoFocus]);

	const styles = StyleSheet.create({
		container: {
			width: width ? width : '100%',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			flexWrap: 'nowrap',
			marginLeft: 20,
			marginRight: 20,
			minHeight: 50,
			height: height ? height : 50
		},
		keyboardIcon: {
			padding: 14,
			marginLeft: 8
		}
	});

	return (
		<View style={styles.container}>
			{textElement}
			<TextInput
				style={inputStyle}
				disableFullscreenUI
				returnKeyType="go"
				{...inputProps}
				setValidated={setValidated}
				onFocus={() => setShowKeyboard(true)}
				onBlur={() => setShowKeyboard(false)}
				blurOnSubmit={false}
				placeholderTextColor={placeholderTextColor}
				ref={_textInput}
				onChangeText={text => setValue(text)}
				keyboardType={showKeyboard ? inputProps.keyboardType : undefined}
				autoFocus={autoFocus}
				autoCapitalize="none"
				autoCompleteType="off"
				autoCorrect={false}
				// showSoftInputOnFocus={!autoFocus && !showKeyboard}
				onSubmitEditing={handleSubmit}
				onKeyPress={event => {
					if (event.nativeEvent.key === 'Enter' && validated) {
						handleSubmit();
					}
				}}
			/>
			{showBarCodeIcon &&
				<Icon
					name="barcode"
					size={20}
					color={'grey'}
					style={{ position: 'absolute', right: 50 }}
				/>}
			{Platform.OS === 'ios' && showKeyboardIcon && (
				<TouchableOpacity onPress={showKeyboard ? setBlur : setFocus} style={styles.keyboardIcon}>
					<Icon name="keyboard" size={20} color={showKeyboard ? activeKeyboardIconColor : inactiveKeyboardIconColor} />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default ScanTextInput;

ScanTextInput.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	style: PropTypes.object,
	overrideValue: PropTypes.any,
	clearOnSubmit: PropTypes.bool,
	borderRadius: PropTypes.number,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	height: PropTypes.number,
	placeholderTextColor: PropTypes.string,
	activeKeyboardIconColor: PropTypes.string,
	inactiveKeyboardIconColor: PropTypes.string,
	inputProps: PropTypes.object,
	textElement: PropTypes.object,
	isFocused: PropTypes.bool,
	autoFocus: PropTypes.bool,
	showKeyboardIcon: PropTypes.bool,
	showBarCodeIcon: PropTypes.bool,
	validate: PropTypes.bool
};
