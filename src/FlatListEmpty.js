import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as StyledText from './StyledText';
import Layout from '../constants/Layout';
import PropTypes from 'prop-types';

export default function FlatListEmpty({ width, containerStyle, textStyle, textColor = 'rgba(4, 4, 21, 0.8)' }) {
	return (
		<View style={[styles.container, { width: width || Layout.window.tableWidth }, containerStyle]}>
			<StyledText.Body1 style={textStyle} textColor={textColor}>
				No results found
			</StyledText.Body1>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: Layout.window.tableWidth,
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderColor: '#D8D8D8',
		borderRadius: 10,
		marginVertical: 10,
		paddingVertical: 20,
		borderWidth: 0.5
	}
});

FlatListEmpty.propTypes = {
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	containerStyle: PropTypes.object,
	textStyle: PropTypes.object,
	textColor: PropTypes.string
};
