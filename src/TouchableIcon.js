import React from 'react';
import TouchableOpacity from './TouchableOpacity';
import { Image } from 'react-native';

const TouchableIcon = ({
	onPress,
	touchableStyle,
	imageStyle,
	source,
	height = 30,
	width = 30,
	resizeMode = 'cover',
	resizeMethod = 'scale',
	opacity = 1
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={touchableStyle}>
			<Image
				source={source}
				style={{ height, width, ...imageStyle }}
				resizeMode={resizeMode}
				resizeMethod={resizeMethod}
				opacity={opacity}
			/>
		</TouchableOpacity>
	);
};

export default TouchableIcon;
