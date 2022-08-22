import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from '@expo/vector-icons/FontAwesome5';
import chroma from 'chroma-js';
import PropTypes from 'prop-types';
import * as StyledText from './StyledText';

const SCREEN_WIDTH = Dimensions.get('window').width;

const StyledSelect = props => {
	const {
		items,
		value,
		onValueChange,
		enableActionOnValueChange,
		width,
		height = 40,
		separatorColor,
		backgroundColor = '#fff',
		color,
		placeholderBold,
		fontSize,
		placeholder,
		noPlaceholder,
		onDonePress = () => {}
	} = props;

	const [selected, setSelected] = useState(value);
	const [pickerVisible, setPickerVisible] = useState(false);

	useEffect(() => {
		setSelected(value);
	}, [value]);

	const performActionOnValueChange = value => {
		onValueChange(value);
		setSelected(value);
	};

	const RNPickerWrapper = {
		fontFamily: 'DMSans-Regular',
		borderBottomWidth: separatorColor ? 1 : 0,
		borderBottomColor: separatorColor,
		overflow: 'hidden',
		width: width,
		height: height,
		justifyContent: 'center',
		alignItems: 'flex-start'
	};

	const placeholderColor = chroma.contrast(backgroundColor, '#fff') > 5 ? '#fff' : '#000';

	// get label
	const renderValueLabel = () => {
		// if value is set, loop items to find label
		if (selected) {
			const label = items.find(item => item.value === selected);
			if (label) {
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
			return <Picker.Item label={placeholder} value={null} />;
		}
		return null;
	};

	const renderItems = () => {
		return items.map(item => {
			return <Picker.Item key={item.value} label={item.label} value={item.value} />;
		});
	};

	const onDone = () => {
		onValueChange(selected);
		setPickerVisible(false);
		onDonePress(selected);
	};

	return (
		<View style={RNPickerWrapper}>
			<TouchableOpacity
				onPress={togglePicker}
				style={{
					// backgroundColor: 'salmon',
					width,
					height,
					paddingHorizontal: 10,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
				<StyledText.Body1
					style={{
						color: color || placeholderColor,
						fontWeight: placeholderBold ? 'bold' : 'normal',
						fontSize
					}}
				>
					{renderValueLabel()}
				</StyledText.Body1>
				<View>
					<Icon name="caret-down" size={16} color={color || placeholderColor} />
				</View>
			</TouchableOpacity>
			{pickerVisible && (
				<Modal transparent visible animationType="none">
					<TouchableWithoutFeedback onPress={onDone}>
						<View style={styles.outerContainer}></View>
					</TouchableWithoutFeedback>
					<View style={styles.pickerContainer}>
						<View style={styles.doneBarContainer}>
							<TouchableOpacity style={styles.doneBarButton} onPress={onDone}>
								<StyledText.Body1 style={styles.doneBarText}>Done</StyledText.Body1>
							</TouchableOpacity>
						</View>
						<Picker
							style={styles.pickerStyle}
							selectedValue={selected}
							itemStyle={styles.pickerItemStyle}
							onValueChange={value =>
								enableActionOnValueChange ? performActionOnValueChange(value) : setSelected(value)
							}
						>
							{noPlaceholder ? null : renderPlaceholder()}
							{renderItems()}
						</Picker>
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
	container: {
		width: 150,
		height: 70
	},
	textStyle: {
		fontSize: 20,
		color: 'black'
	},
	pickerContainer: {
		position: 'absolute',
		bottom: 0,
		width: SCREEN_WIDTH
	},
	pickerStyle: {
		width: '100%',
		// height: 180,
		marginTop: 0,
		marginBottom: 0,
		backgroundColor: 'rgb(209, 212, 217)'
	},
	pickerItemStyle: {
		paddingTop: 0,
		paddingBottom: 0,
		height: 160,
		fontSize: 22
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

export default StyledSelect;

StyledSelect.propTypes = {
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
	validationErrorColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	color: PropTypes.string,
	placeholderBold: PropTypes.bool,
	fontSize: PropTypes.number,
	placeholder: PropTypes.string,
	noPlaceholder: PropTypes.bool
};
