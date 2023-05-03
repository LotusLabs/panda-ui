import React from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import * as StyledText from './StyledText';

function StyledSwitch({
	label,
	value,
	onChange,
	color = '#5A5A5A',
	thumbColor = 'white',
	iconElement,
	textStyle,
	switchStyle,
	containerStyle,
	scale = 0.8, // size of switch
	trackColorTrue,
	trackColorFalse
}) {
	const labelStyle = {
		marginRight: 5,
		fontWeight: '500',
		opacity: 0.7,
		...textStyle
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<StyledText.Body2 textColor={color} style={labelStyle}>
				{label}
			</StyledText.Body2>
			{iconElement ? iconElement : null}
			<Switch
				trackColor={{
					true: trackColorTrue || '#3C7378',
					false: trackColorFalse || '#c5c5c8'
				}}
				thumbColor={thumbColor}
				value={value}
				onValueChange={value => onChange(value)}
				style={[styles.switchContainer, { transform: [{ scaleX: scale }, { scaleY: scale }] }, switchStyle]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 5
	},
	switchContainer: {
		marginLeft: 5
	}
});

export default StyledSwitch;
