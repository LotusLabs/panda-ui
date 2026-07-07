import React from 'react';
import { View } from 'react-native';

import SortColumn from './SortColumn';
import Layout from './constants/Layout';

const SortHeader = props => {
	const {
		screenWidth,
		columns,
		sortConfig,
		onSortChange,
		filterConfig = {},
		onFilterChange,
		filterOptions = {},
		borderRadius = 0,
		borderRadiusLeft = borderRadius,
		borderRadiusRight = borderRadius,
		noSort = false,
		defaultSortConfig,
		sortIndicatorColor = '#4a1830',
		backgroundColor,
		selectedColor = '#a34e76',
		borderColor = 'transparent',
		textColor = '#fff',
		fontWeight,
		textActiveColor,
		headerContainerStyle,
		cellContainerStyle,
		textStyle
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
				const sortKey = column.sortKey ? column.sortKey : column.key;
				return (
					<SortColumn
						key={String(i)}
						column={column}
						columnCount={columns.length}
						i={i}
						sortConfig={sortConfig}
						onSortChange={onSortChange}
						filterValue={filterConfig[sortKey]}
						onFilterChange={onFilterChange}
						filterOptions={filterOptions[sortKey] || column.filterOptions}
						borderRadiusLeft={borderRadiusLeft}
						borderRadiusRight={borderRadiusRight}
						noSort={noSort}
						defaultSortConfig={defaultSortConfig}
						sortIndicatorColor={sortIndicatorColor}
						borderColor={borderColor}
						selectedColor={selectedColor}
						textColor={textColor}
						fontWeight={fontWeight}
						textActiveColor={textActiveColor}
						screenWidth={SCREEN_WIDTH}
						cellContainerStyle={cellContainerStyle}
						textStyle={textStyle}
					/>
				);
			})}
		</View>
	);
};

export default SortHeader;
