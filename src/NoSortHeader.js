import React from 'react';
import PropTypes from 'prop-types';
import {
	View
} from 'react-native';

import NoSortColumn from './NoSortColumn';
import Layout from './constants/Layout';

const NoSortHeader = props => {
	const {
		screenWidth,
		columns,
		borderRadius = 0,
		borderRadiusLeft = borderRadius,
		borderRadiusRight = borderRadius,
		tintColor = '#772d4f',
		backgroundColor = tintColor,
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
				return (
					<NoSortColumn
						key={String(i)}
						column={column}
						columnCount={column.length}
						i={i}
						borderRadiusLeft={borderRadiusLeft}
						borderRadiusRight={borderRadiusRight}
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

NoSortHeader.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.any.isRequired,
			align: PropTypes.string,
			label: PropTypes.node,
			width: PropTypes.number.isRequired,
			icon: PropTypes.node,
			textAlign: PropTypes.node
		})
	),
	borderRadius: PropTypes.number,
	borderRadiusLeft: PropTypes.number,
	borderRadiusRight: PropTypes.number,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	tintColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	selectedColor: PropTypes.string,
	borderColor: PropTypes.string,
	textColor: PropTypes.string,
	screenWidth: PropTypes.number,
	headerContainerStyle: PropTypes.object,
	cellContainerStyle: PropTypes.object,
	textStyle: PropTypes.object,
	fontWeight: PropTypes.string,
	textActiveColor: PropTypes.string
};

export default NoSortHeader;

