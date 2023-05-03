import React from 'react';
import PropTypes from 'prop-types';
import {
	View
} from 'react-native';

import SortColumn from './SortColumn';
import Layout from './constants/Layout';

const SortHeader = (props) => {
	const {
		screenWidth,
		columns,
		sortConfig,
		onSortChange,
		borderRadius = 0,
		borderRadiusLeft = borderRadius,
		borderRadiusRight = borderRadius,
		noSort = false,
		sortIndicatorColor = '#4a1830',
		tintColor = '#772d4f',
		backgroundColor = tintColor,
		selectedColor = '#a34e76',
		borderColor = 'transparent',
		textColor = '#fff',
		headerContainerStyle,
		cellContainerStyle,
		fontWeight,
		textActiveColor,
	} = props;

	const SCREEN_WIDTH = screenWidth || Layout.window.width;

	const rootStyle = {
		flexDirection: 'row',
		backgroundColor: backgroundColor,
		borderWidth: 0.5,
		borderStyle: 'solid',
		borderColor: borderColor,
		borderTopLeftRadius: borderRadiusLeft,
		borderTopRightRadius: borderRadiusRight
	};

	return (
		<View style={[rootStyle, headerContainerStyle]}>
			{columns.map((column, i) => {
				return (
					<SortColumn
						key={String(i)}
						column={column}
						columnCount={column.length}
						i={i}
						sortConfig={sortConfig}
						onSortChange={onSortChange}
						borderRadiusLeft={borderRadiusLeft}
						borderRadiusRight={borderRadiusRight}
						noSort={noSort}
						sortIndicatorColor={sortIndicatorColor}
						borderColor={borderColor}
						selectedColor={selectedColor}
						textColor={textColor}
						fontWeight={fontWeight}
						textActiveColor={textActiveColor}
						screenWidth={SCREEN_WIDTH}
						cellContainerStyle={cellContainerStyle}
					/>
				);
			})}
		</View>
	);
};

SortHeader.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.any.isRequired,
		sortKey: PropTypes.string,
		align: PropTypes.string,
		label: PropTypes.node,
		width: PropTypes.number.isRequired,
		icon: PropTypes.node,
		textAlign: PropTypes.node
	})),
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
	tintColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	selectedColor: PropTypes.string,
	borderColor: PropTypes.string,
	textColor: PropTypes.string,
	screenWidth: PropTypes.number,
	headerContainerStyle: PropTypes.object,
	cellContainerStyle: PropTypes.object,
	fontWeight: PropTypes.string,
	textActiveColor: PropTypes.string
};

export default SortHeader;
