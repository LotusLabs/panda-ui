import React from 'react';
import TouchableOpacity from './TouchableOpacity';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

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

TouchableIcon.propTypes = {
	onPress: PropTypes.func,
	source: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
	touchableStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	imageStyle: PropTypes.object,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	resizeMode: PropTypes.string,
	resizeMethod: PropTypes.string,
	opacity: PropTypes.number
};
