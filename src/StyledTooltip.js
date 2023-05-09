import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Tooltip } from 'react-native-elements';
import PropTypes from 'prop-types';

const TEXT_COLOR = 'black';
const BACKGROUND_COLOR = 'white';

function StyledTooltip(props) {
	const { TooltipComponent, width, height, tooltipBackgroundColor, pointerColor, label, labelColor, imageElement } = props;

	return (
		<Tooltip
			height={height || 250}
			width={width || 200}
			pointerColor={pointerColor || BACKGROUND_COLOR}
			containerStyle={{
				backgroundColor: tooltipBackgroundColor || BACKGROUND_COLOR,
				borderColor: TEXT_COLOR,
				borderWidth: 0.5
			}}
			popover={TooltipComponent}
			overlayColor={null}
			highlightColor="transparent"
		>

			{imageElement ? imageElement :<Text style={[styles.tooltipLabel, { color: labelColor || BACKGROUND_COLOR }]}>{label}</Text>}
		</Tooltip>
	);
}

const styles = StyleSheet.create({
	tooltipLabel: {
		fontWeight: 'bold',
		fontSize: 24,
		textAlign: 'center'
	}
});

StyledTooltip.propTypes = {
	TooltipComponent: PropTypes.element.isRequired,
	tooltipBackgroundColor: PropTypes.string,
	label: PropTypes.string,
	imageElement: PropTypes.element,
	labelColor: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	pointerColor: PropTypes.string
};

export default StyledTooltip;
