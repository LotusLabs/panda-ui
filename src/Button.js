import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
	TouchableWithoutFeedback,
	Text,
	Platform
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SvgCss } from 'react-native-svg';

import warning from './utils/warning';


const Button = (props) => {
	const {
		onPress,
		svg,
		label,
		disabled,
		width='auto',
		size='standard',
		transparent=false,
		color,
		gradient,
		style,
		fontSize,
		allowInteraction=true,
		borderRadius=0,
		borderWidth=0,
		height,
		dropShadow=false,
		column=false,
		borderColor,
		disabledColor='lightgrey',
		disabledGradient,
		textColor='#fff',
		disabledTextColor='#fff',
		textElement,
		iconElement
	} = props;

	warning(iconElement || textElement || label || svg, 'Must provide "iconElement", "textElement", "label", or "svg" to <Button>.');

	const displayColor = disabled ? disabledColor : gradient && gradient.length > 1 ? 'transparent' : color;
	const backgroundColor = transparent ?  'transparent' : displayColor;

	const buttonStyle = {
		...style,
		width: width,
		height: height > 0 ? height : size === 'small' ? 30 : size === 'standard' ? 35 : 45,
		flexDirection: column ? 'column' : 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: backgroundColor,
		borderRadius: borderRadius,
		overflow: 'hidden'
	};

	const buttonStyleBorder = {
		...buttonStyle,
		borderStyle: 'solid',
		borderColor: borderColor ? borderColor : displayColor,
		borderWidth: borderWidth
	};

	const buttonStyleDropShadow = {
		...buttonStyle,
		borderWidth: borderWidth,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1
	};

	const Component = (disabled || !allowInteraction) ? View : TouchableWithoutFeedback;

	return (
		<Component onPress={(disabled || !allowInteraction) ? undefined : () => onPress()} style={buttonStyle }>
			{gradient && gradient.length > 1 ?
				Platform.OS === 'ios' ?
					(
						<View style={borderWidth > 0 && !gradient ?
							buttonStyleBorder
							:
							dropShadow ? buttonStyleDropShadow : buttonStyle }>
							<LinearGradient
								colors={disabled ? disabledGradient : gradient}
								start={[0, 0]}
								end={[1, 1]}
								width="100%"
								height="100%"
							>
								<View style={borderWidth > 0 && !gradient ?
									buttonStyleBorder
									:
									dropShadow ? buttonStyleDropShadow : buttonStyle }>

									<ButtonContent
										svg={svg}
										label={label}
										disabled={disabled}
										size={size}
										color={color}
										fontSize={fontSize}
										disabledColor={disabledColor}
										textColor={textColor}
										disabledTextColor={disabledTextColor}
										textElement={textElement}
										iconElement={iconElement}
									/>
								</View>
							</LinearGradient>
						</View>)

					:
					(<LinearGradient
						colors={disabled ? disabledGradient : gradient}
						start={[0, 0]}
						end={[1, 1]}
						width="100%"
						height="100%"
						style={borderWidth > 0 ?
							buttonStyleBorder
							:
							dropShadow ? buttonStyleDropShadow : buttonStyle}
					>
						<View style={borderWidth > 0 && !gradient ?
							buttonStyleBorder
							:
							dropShadow ? buttonStyleDropShadow : buttonStyle }>
							<ButtonContent
								svg={svg}
								label={label}
								disabled={disabled}
								size={size}
								color={color}
								fontSize={fontSize}
								disabledColor={disabledColor}
								textColor={textColor}
								disabledTextColor={disabledTextColor}
								textElement={textElement}
								iconElement={iconElement}
							/>
						</View>
					</LinearGradient>)
				:
				(<View style={borderWidth > 0 ?
					buttonStyleBorder
					:
					dropShadow ? buttonStyleDropShadow : buttonStyle }>
					<ButtonContent
						svg={svg}
						label={label}
						disabled={disabled}
						size={size}
						color={color}
						fontSize={fontSize}
						disabledColor={disabledColor}
						disabledTextColor={disabledTextColor}
						textColor={textColor}
						textElement={textElement}
						iconElement={iconElement}
					/>
				</View>)
			}
		</Component>
	);
};

const ButtonContent = (props) => {
	const {
		svg,
		label,
		disabled,
		size='standard',
		fontSize,
		textColor='#fff',
		disabledTextColor='#fff',
		textElement,
		iconElement
	} = props;

	const displayColor = disabled ? disabledTextColor : textColor;

	const buttonLabelStyle = {
		color: displayColor,
		fontSize: fontSize || (size === 'small' ? 14 : size === 'standard' ? 16 : 20),
		fontWeight: 'bold',
		textAlign: 'center'
	};

	return (
		<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
			{iconElement}
			{svg &&
				(
					<SvgCss
						xml={svg}
						height="30" width="30"
					/>
				)
			}
			{label && !textElement && Platform.OS === 'ios' ?
				(
					<View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
						<Text style={buttonLabelStyle}>{label}</Text>
					</View>
				)
				: label && !textElement && Platform.OS !== 'ios' ?
					(
						<View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
							<Text style={buttonLabelStyle}>{label}</Text>
						</View>
					)
					:
					(undefined)
			}
			{textElement && Platform.OS === 'ios' ?
				(
					<View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
						{textElement}
					</View>
				)
				: textElement && Platform.OS !== 'ios' ?
					(
						<View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
							{textElement}
						</View>
					)
					:
					(undefined)
			}
		</View>
	);
};

Button.propTypes = {
	onPress: PropTypes.func.isRequired,
	label: PropTypes.string,
	svg: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	disabled: PropTypes.bool,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	size: PropTypes.oneOf(['small', 'standard', 'large']),
	transparent: PropTypes.bool,
	color: PropTypes.string,
	disabledColor: PropTypes.string,
	style: PropTypes.object,
	fontSize: PropTypes.number,
	textColor: PropTypes.string,
	disabledTextColor: PropTypes.string,
	allowInteraction: PropTypes.bool,
	borderRadius: PropTypes.number,
	borderWidth: PropTypes.number,
	height: PropTypes.number,
	dropShadow: PropTypes.bool,
	column: PropTypes.bool,
	borderColor: PropTypes.string,
	textElement: PropTypes.object,
	iconElement: PropTypes.object,
	gradient: PropTypes.array,
	disabledGradient: PropTypes.array
};

export default Button;
