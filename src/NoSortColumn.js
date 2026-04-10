import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Layout from './constants/Layout';

const NoSortColumn = props => {
	const {
		column,
		i,
		columnCount,
		borderRadiusLeft,
		borderRadiusRight,
		height,
		selectedColor = '#a34e76',
		borderColor = 'transparent',
		textColor = '#fff',
		textActiveColor = '#fff',
		fontWeight = 'bold',
		screenWidth,
		textStyle,
		cellContainerStyle
	} = props;

	const SCREEN_WIDTH = screenWidth || Layout.window.width;

	const commonTextStyle = {
		fontWeight: fontWeight,
		maxHeight: height,
		color: textColor,
		...textStyle
	};

	const commonViewStyle = {
		padding: 10,
		height: height,
		justifyContent: 'center',
		alignItems: 'center'
	};

	const activeTextStyle = {
		...commonTextStyle,
		color: textActiveColor || textColor
	};

	const activeViewStyle = {
		...commonViewStyle,
		backgroundColor: selectedColor
	};

	const middleBorderStyle = {
		borderRightWidth: 0.5,
		borderStyle: 'solid',
		borderColor: borderColor
	};

	const leftBorderStyle = {
		borderLeftWidth: Platform.OS === 'ios' ? 0 : 0.5,
		borderRightStyle: Platform.OS === 'ios' ? 'none' : 'solid',
		borderTopLeftRadius: borderRadiusLeft,
		borderColor: Platform.OS === 'ios' ? undefined : borderColor
	};

	const rightBorderStyle = {
		borderRightWidth: Platform.OS === 'ios' ? 0 : 0.5,
		borderRightStyle: Platform.OS === 'ios' ? 'none' : 'solid',
		borderTopRightRadius: borderRadiusRight,
		borderColor: Platform.OS === 'ios' ? undefined : borderColor
	};

	/**
	 * Getter for text styles.
	 *
	 * @param  {boolean} active
	 * @param  {boolean} showBorder
	 * @param  {number}  width
	 * @param  {Text}  align
	 *
	 * @return {object} Object to apply to a `style` prop.
	 */
	function getTextStyle(active, showBorder, width, align) {
		const baseStyle = active ? activeTextStyle : commonTextStyle;

		return {
			width,
			flexDirection: 'row',
			backgroundColor: 'transparent',
			borderTopLeftRadius: borderRadiusLeft,
			borderTopRightRadius: borderRadiusRight,
			textAlign: align || 'center',
			...baseStyle
		};
	}

	/**
	 * Getter for view styles.
	 *
	 * @param  {boolean} active
	 * @param  {number}  width
	 * @param  {string} i
	 * @param  {number} length
	 *
	 * @return {object} Object to apply to a `style` prop.
	 */
	function getViewStyle(active, width, i, length) {
		const baseStyle = active ? activeViewStyle : commonViewStyle;
		const leftBorderStyleObj = i === 0 ? leftBorderStyle : undefined;
		const rightBorderStyleObj = i === length - 1 ? rightBorderStyle : undefined;
		const middleBorderStyleObj = i > 0 && i < length - 1 ? middleBorderStyle : undefined;

		return {
			...baseStyle,
			...leftBorderStyleObj,
			...rightBorderStyleObj,
			...middleBorderStyleObj,
			width,
			flexDirection: 'row',
			alignItems: 'center',
			...cellContainerStyle
		};
	}

	return (
		<View
			style={getViewStyle(false, column.width * SCREEN_WIDTH, i, columnCount)}
		>
			{column.icon && (
				<FontAwesome name={column.icon} size={20} color={textColor} style={{ marginLeft: 10 }} />
			)}

			{column.label ? <Text
				style={[
					getTextStyle(false, i < columnCount - 1, column.width * screenWidth * 0.8, column.align)
				]}
			>
				{column.label}
			</Text> : null }
		</View>
	);
};

NoSortColumn.propTypes = {
	column: PropTypes.shape({
		key: PropTypes.any.isRequired,
		align: PropTypes.string,
		label: PropTypes.node,
		width: PropTypes.number.isRequired,
		icon: PropTypes.node,
		textAlign: PropTypes.node
	}),
	i: PropTypes.number,
	borderRadius: PropTypes.number,
	borderRadiusLeft: PropTypes.number,
	borderRadiusRight: PropTypes.number,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	tintColor: PropTypes.string,
	columnCount: PropTypes.number,
	selectedColor: PropTypes.string,
	borderColor: PropTypes.string,
	textColor: PropTypes.string,
	fontWeight: PropTypes.string,
	textActiveColor: PropTypes.string,
	screenWidth: PropTypes.number,
	cellContainerStyle: PropTypes.object,
	textStyle: PropTypes.object
};

export default NoSortColumn;
