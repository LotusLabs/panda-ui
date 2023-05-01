import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

// Do as much work outside of the `Template` as possible

// using default resizeMode and resizeMethod should prevent flickering
export default function BasicImage(props) {
	const {
		source,
		height = '100%',
		width = '100%',
		resizeMode = 'cover',
		resizeMethod = 'scale',
		opacity = 1,
		style
	} = props;

	return (
		<Image
			source={source}
			style={{ height, width, ...style }}
			resizeMode={resizeMode}
			resizeMethod={resizeMethod}
			opacity={opacity}
		/>
	);
}

BasicImage.propTypes = {
	source: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	resizeMode: PropTypes.string,
	resizeMethod: PropTypes.string,
	opacity: PropTypes.number,
	style: PropTypes.object
};
