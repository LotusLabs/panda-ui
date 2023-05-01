import React from 'react';
import StyledSelect from './StyledSelect';

const CustomStyledSelect = ({
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
		borderWidth: border && 1,
		borderColor: border && '#D8D8D8',
		paddingHorizontal: 30,
		borderRadius: 8,
		borderBottomWidth: border && 1,
		...style
	};
	const touchableContainer = {
		paddingHorizontal: 20,
		justifyContent: 'space-around',
		...touchableStyle
	};

	const TextColor = selectedValue === null || selectedValue === undefined ? placeholderColor : color;

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

export default CustomStyledSelect;
