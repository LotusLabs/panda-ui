import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import Icon from '@expo/vector-icons/FontAwesome5';
import chroma from 'chroma-js';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Picker = props => {
	const {
		items,
		value,
		onValueChange,
		enableActionOnValueChange = false,
		width,
		height = 40,
		separatorColor,
		backgroundColor = '#fff',
		color,
		placeholderBold,
		labelFontSize = 16,
		placeholder,
		noPlaceholder,
		onDonePress = () => {},
		pickerStyles,
		pickerModalSelectStyles,
		pickerItemStyles,
		buttonTextElement,
		buttonLabel='Done',
		LabelComponent=Text
	} = props;

	const [selectedValue, setSelectedValue] = useState(value);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [pickerVisible, setPickerVisible] = useState(false);

	const pickerModalSelectStyle = {
		width: '100%',
		marginTop: 0,
		marginBottom: 0,
		backgroundColor: 'rgb(209, 212, 217)',
		...pickerModalSelectStyles
	};
	const pickerItemStyle = {
		paddingTop: 0,
		paddingBottom: 0,
		height: 160,
		fontSize: 22,
		...pickerItemStyles
	};

	const pickerContainer = {
		// position: pickerPosition === 'bottom' ? 'absolute' : undefined,
		// bottom: pickerPosition === 'bottom' ? 0 : undefined,
		// width: pickerPosition === 'bottom' ? SCREEN_WIDTH : SCREEN_WIDTH / 3,
		// justifyContent: pickerPosition === 'bottom' ? undefined : 'center',
		// alignItems: pickerPosition === 'bottom' ? undefined : 'flex-start'
		position: 'absolute',
		bottom: 0,
		width: SCREEN_WIDTH
	};

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	const performActionOnValueChange = (itemValue, itemIndex) => {
		onValueChange(itemValue, itemIndex);
	};

	const RNPickerWrapper = {
		borderBottomWidth: separatorColor ? 1 : 0,
		borderBottomColor: separatorColor,
		overflow: 'hidden',
		width: width,
		height: height,
		justifyContent: 'center',
		alignItems: 'flex-start',
		...pickerStyles
	};

	const placeholderColor = chroma.contrast(backgroundColor, '#fff') > 5 ? '#fff' : '#000';

	// get label
	const renderValueLabel = () => {
		// if value is set, loop items to find label
		if (selectedValue !== undefined) {
			const label = items.find(item => item.value === selectedValue);
			if (label !== undefined) {
				return label.label;
			}
		}
		return placeholder || '';
	};

	const togglePicker = () => {
		setPickerVisible(prev => !prev);
	};

	const renderPlaceholder = () => {
		if (placeholder) {
			return <RNPicker.Item label={placeholder} value={null} />;
		}
		return null;
	};

	const renderItems = () => {
		return items.map(item => {
			return <RNPicker.Item key={item.value} label={item.label} value={item.value} />;
		});
	};

	const onDone = () => {
		onValueChange(selectedValue, selectedIndex);
		setPickerVisible(false);
		onDonePress();
	};

	return (
		<View style={RNPickerWrapper}>
			<TouchableOpacity
				onPress={togglePicker}
				style={{
					width,
					height,
					paddingHorizontal: 10,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
				<LabelComponent
					style={{
						color: color || placeholderColor,
						fontWeight: placeholderBold ? 'bold' : 'normal',
						fontSize: labelFontSize
					}}
				>
					{renderValueLabel()}
				</LabelComponent>
				<View>
					<Icon name="caret-down" size={16} color={color || placeholderColor} />
				</View>
			</TouchableOpacity>
			{pickerVisible && (
				<Modal transparent visible animationType="none">
					<TouchableWithoutFeedback onPress={onDone}>
						<View style={styles.outerContainer}></View>
					</TouchableWithoutFeedback>
					<View style={pickerContainer}>
						<View style={styles.doneBarContainer}>
							<TouchableOpacity style={styles.doneBarButton} onPress={onDone}>
								{ buttonTextElement ? buttonTextElement : <Text style={styles.doneBarText}>{buttonLabel}</Text> }
							</TouchableOpacity>
						</View>
						<RNPicker
							style={pickerModalSelectStyle}
							selectedValue={selectedValue}
							itemStyle={pickerItemStyle}
							onValueChange={(itemValue, itemIndex) => {
								if (enableActionOnValueChange) {
									setSelectedValue(itemValue);
									setSelectedIndex(itemIndex);
									performActionOnValueChange(itemValue, itemIndex);
								} else {
									setSelectedValue(itemValue);
									setSelectedIndex(itemIndex);
								}
							}}
						>
							{noPlaceholder ? null : renderPlaceholder()}
							{renderItems()}
						</RNPicker>
					</View>
				</Modal>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1
	},
	doneBarContainer: {
		height: 44,
		width: '100%',
		backgroundColor: 'rgb(248, 248, 248)',
		alignItems: 'flex-end',
		paddingHorizontal: 10,
		justifyContent: 'center',
		borderTopWidth: 1,
		borderTopColor: 'lightgrey'
	},
	doneBarText: {
		fontSize: 20,
		fontWeight: 'normal',
		color: 'rgb(0, 122, 255)'
	}
});

export default Picker;

Picker.propTypes = {
	items: PropTypes.array,
	label: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	meta: PropTypes.any,
	onValueChange: PropTypes.func.isRequired,
	enableActionOnValueChange: PropTypes.bool,
	enabled: PropTypes.bool,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	input: PropTypes.any,
	rest: PropTypes.any,
	separatorColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	color: PropTypes.string,
	placeholderBold: PropTypes.bool,
	labelFontSize: PropTypes.number,
	placeholder: PropTypes.string,
	noPlaceholder: PropTypes.bool,
	onDonePress: PropTypes.func,
	pickerStyles: PropTypes.object,
	pickerModalSelectStyles: PropTypes.object,
	pickerItemStyles: PropTypes.object,
	buttonTextElement: PropTypes.object,
	buttonLabel: PropTypes.string,
	LabelComponent: PropTypes.func
};
