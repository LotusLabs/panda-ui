import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as StyledText from './StyledText';
import PropTypes from 'prop-types';

function StyledLoader({ small, label, color = '#fff', loaderStyle, modalStyle, textStyle }) {
	const loaderText = {
		width: '100%',
		color: '#fff',
		marginTop: 20,
		textAlign: 'center',
		...textStyle
	};
	return (
		<View style={[styles.modalBackground, modalStyle]}>
			<View style={[styles.loaderBackground, loaderStyle]}>
				<ActivityIndicator color={color} size={small ? 'small' : 'large'} />
				<StyledText.Body1 style={loaderText}>{label ? label : 'Loading...'}</StyledText.Body1>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	modalBackground: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.1)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loaderBackground: {
		backgroundColor: 'rgba(1,1,1,0.5)',
		width: '25%',
		height: '20%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	}
});

export default StyledLoader;

StyledLoader.propTypes = {
	small: PropTypes.bool,
	label: PropTypes.string,
	color: PropTypes.string,
	textStyle: PropTypes.object,
	modalStyle: PropTypes.object,
	loaderStyle: PropTypes.object
};
