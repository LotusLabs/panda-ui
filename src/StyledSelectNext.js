import React from 'react';
import StyledSelect from './StyledSelect';
import PropTypes from 'prop-types';

const StyledSelectNext = ({
	items,
	width = 175,
	height = 45,
	fontSize = 14,
	placeholder,
	placeholderBold,
	noPlaceholder,
	placeholderColor = '#22282F',
	onValueChange,
	value,
	style,
	touchableStyle,
	border = true,
	selectedValue,
	enableActionOnValueChange,
	color = '#22282F',
	iconColor = '#3C7378',
	separatorColor,
	backgroundColor,
	onDonePress
}) => {
	const containerStyle = {
		backgroundColor: '#fff',
		alignItems: 'center',
		borderWidth: border ? 1 : 0,
		borderColor: border ? '#D8D8D8' : color,
		paddingHorizontal: 30,
		borderRadius: 8,
		borderBottomWidth: border ? 1 : 0,
		...style
	};
	const touchableContainer = {
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		...touchableStyle
	};

	const TextColor = !value ? placeholderColor : color;

	return (
		<StyledSelect
			placeholder={placeholder}
			placeholderBold={placeholderBold}
			onValueChange={onValueChange}
			items={items}
			value={value}
			selectedValue={selectedValue}
			fontSize={fontSize} // fontSize
			height={height}
			width={width}
			touchableStyle={touchableContainer}
			color={TextColor} // TextColor
			containerStyle={containerStyle}
			enableActionOnValueChange={enableActionOnValueChange}
			separatorColor={separatorColor}
			backgroundColor={backgroundColor}
			noPlaceholder={noPlaceholder}
			onDonePress={onDonePress}
			iconColor={iconColor}
		/>
	);
};

export default StyledSelectNext;

StyledSelectNext.propTypes = {
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
	noPlaceholder: PropTypes.bool,
	border: PropTypes.bool,
	containerStyle: PropTypes.object,
	touchableStyle: PropTypes.object,
	style: PropTypes.object,
	iconColor: PropTypes.string,
	placeholderColor: PropTypes.string,
	selectedValue: PropTypes.string,
	onDonePress: PropTypes.func
};
