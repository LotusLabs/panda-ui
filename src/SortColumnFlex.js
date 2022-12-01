import React from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	Text
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronUp } from '@fortawesome/pro-solid-svg-icons';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';

// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PADDING = 10;

const SortColumnFlex = (props) => {
	const {
		column,
		i,
		columnCount=1,
		sortConfig,
		onSortChange,
		borderRadiusLeft,
		borderRadiusRight,
		noSort,
		height,
		backgroundColor = 'transparent',
		sortIndicatorColor = '#4a1830',
		selectedColor = '#a34e76',
		textColor = '#fff',
		textActiveColor = '#fff',
		cellContainerStyle
	} = props;

	const commonTextStyle = {
		flexGrow: 1,
		width: 0,
		fontWeight: 'bold',
		maxHeight: height,
		color: textColor
	};

	const commonViewStyle = {
		flexGrow: 1,
		width: 0,
		padding: PADDING,
		height: height,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		backgroundColor: backgroundColor
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
		borderWidth: 0
	};

	const leftBorderViewStyle = {
		borderWidth: 0,
		borderTopLeftRadius: borderRadiusLeft
	};

	const rightBorderViewStyle = {
		borderWidth: 0,
		borderTopRightRadius: borderRadiusRight
	};

	const leftBorderTextStyle = {
		borderWidth: 0,
		borderTopLeftRadius: borderRadiusLeft > 0 ? borderRadiusLeft + PADDING : 0
	};

	const rightBorderTextStyle = {
		borderWidth: 0,
		borderTopRightRadius: borderRadiusRight > 0 ? borderRadiusRight + PADDING : 0
	};



	/**
	 * Getter for text styles.
	 *
	 * @param  {boolean} active
	 * @param  {number}  flexGrow
	 * @param  {string} i
	 *
	 * @return {object} Object to apply to a `style` prop.
	 */
	function getTextStyle(active, flexGrow, i) {
		const baseStyle = active ? activeTextStyle : commonTextStyle;
		const leftBorderStyleObj =  i === 0  ? leftBorderTextStyle : undefined;
		const rightBorderStyleObj =  i === columnCount - 1 ? rightBorderTextStyle : undefined;
		const middleBorderStyleObj =  i > 0 && i < columnCount - 1 ? middleBorderStyle : undefined;

		return {
			...baseStyle,
			flexWrap: 'nowrap',
			backgroundColor: 'transparent',
			flexGrow,
			flexDirection: 'row',
			alignItems: 'center',
			textAlign: column.textAlign || 'left',
			...leftBorderStyleObj,
			...rightBorderStyleObj,
			...middleBorderStyleObj,
			...cellContainerStyle
		};
	}

	/**
	 * Getter for view styles.
	 *
	 * @param  {boolean} active
	 * @param  {number}  flexGrow
	 * @param  {string} i
	 *
	 * @return {object} Object to apply to a `style` prop.
	 */
	function getViewStyle(active, flexGrow, i) {
		const baseStyle = active ? activeViewStyle : commonViewStyle;
		const leftBorderStyleObj =  i === 0  ? leftBorderViewStyle : undefined;
		const rightBorderStyleObj =  i === columnCount - 1 ? rightBorderViewStyle : undefined;
		const middleBorderStyleObj =  i > 0 && i < columnCount - 1 ? middleBorderStyle : undefined;

		return {
			...baseStyle,
			flexGrow,
			flexDirection: 'row',
			alignItems: 'center',
			textAlign: column?.textAlign || 'left',
			...leftBorderStyleObj,
			...rightBorderStyleObj,
			...middleBorderStyleObj,
			...cellContainerStyle
		};
	}

	const sortKey = column.sortKey ? column.sortKey : column.key;
	let isSorted = sortConfig.key === sortKey;

	return (
		<TouchableOpacity
			style={getViewStyle(isSorted, column.width, i)}
			key={sortKey}
			onPress={() => {
				!noSort  &&
				onSortChange({
					key: sortKey,
					direction: !isSorted ? 'asc' : (
						sortConfig.direction === 'asc' ? 'desc' : 'asc'
					)
				});
			}}
		>
			{
				// column.icon && <FontAwesome5
				// 	key={column.key}
				// 	name={column.icon}
				// 	size={20}
				// 	color={textColor}
				// 	style={{ marginLeft: 10 }}
				// />
			}

			<Text
				style={[
					getTextStyle(isSorted, column.width, i),
					{ textAlign: column?.textAlign ? column.textAlign : 'left' }
				]}
				key={sortKey + '1'}
			>
				{column.label}
			</Text>

			{ isSorted && sortConfig.direction === 'asc' ?
				<FontAwesomeIcon
					key={sortKey + '2'}
					icon={faChevronUp}
					size={12}
					color={sortIndicatorColor}
					style={{ padingLeft: 10, padingRight: 10 }}
				/>
				: false}
			{ isSorted && sortConfig.direction === 'desc' ?
				<FontAwesomeIcon
					key={sortKey + '3'}
					icon={faChevronDown}
					size={12}
					color={sortIndicatorColor}
					style={{ padingLeft: 10, padingRight: 10 }}
				/>
				: false}
		</TouchableOpacity>
	);
};

SortColumnFlex.propTypes = {
	column: PropTypes.shape({
		key: PropTypes.any.isRequired,
		// Node can be string, React element, or anything renderable.
		sortKey: PropTypes.node,
		label: PropTypes.node,
		width: PropTypes.node.isRequired,
		icon: PropTypes.node,
		textAlign: PropTypes.node
	}),
	i: PropTypes.number,
	sortConfig: PropTypes.exact({
		key: PropTypes.any.isRequired,
		direction: PropTypes.oneOf(['asc', 'desc']).isRequired
	}),
	onSortChange: PropTypes.func.isRequired,
	borderRadius: PropTypes.number,
	borderRadiusLeft: PropTypes.number,
	borderRadiusRight: PropTypes.number,
	noSort: PropTypes.bool,
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	sortIndicatorColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	columnCount: PropTypes.number,
	selectedColor: PropTypes.string,
	textColor: PropTypes.string,
	textActiveColor: PropTypes.string,
	cellContainerStyle: PropTypes.object,
	screenWidth: PropTypes.number
};

export default SortColumnFlex;
