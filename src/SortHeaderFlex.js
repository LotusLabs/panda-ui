import React from 'react';
import PropTypes from 'prop-types';
import {
	View
} from 'react-native';

import SortColumnFlex from './SortColumnFlex';
import Layout from './constants/Layout';

const SortHeaderFlex = (props) => {
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
		cellContainerStyle
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
					<SortColumnFlex
						key={String(i)}
						column={column}
						columnCount={columns.length}
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
						screenWidth={SCREEN_WIDTH}
						cellContainerStyle={cellContainerStyle}
					/>
				);
			})}
		</View>
	);
};

SortHeaderFlex.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.any.isRequired,
		// Node can be string, React element, or anything renderable.
		label: PropTypes.node.isRequired
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
	// solid: PropTypes.bool,
	// center: PropTypes.bool,
	// ignoreFirstColumnInSort: PropTypes.bool,
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
	cellContainerStyle: PropTypes.object
};

export default SortHeaderFlex;
