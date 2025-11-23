import React from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';

function TouchableOpacity(props) {
	const { onPress, style, children, disabled = false } = props;
	return (
		<Pressable
			{...props}
			disabled={disabled}
			style={({ pressed }) => [style, { opacity: pressed ? 0.5 : 1 }]}
			onPress={onPress}
		>
			{children}
		</Pressable>
	);
}

export default TouchableOpacity;

TouchableOpacity.propTypes = {
	onPress: PropTypes.func,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.func, PropTypes.array])
};
