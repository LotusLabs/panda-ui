import React from 'react';
import { Pressable } from 'react-native';

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
