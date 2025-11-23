import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';
import { withAnchorPoint } from 'react-native-anchor-point';
import Button from './Button';
import PropTypes from 'prop-types';
import TouchableIcon from './TouchableIcon';

const DEVICE_SCREEN_HEIGHT = Dimensions.get('window').height;
const DEVICE_SCREEN_WIDTH = Dimensions.get('window').width;
const DEFAULT_SIDEBAR_WIDTH = 230;

function DrawerComponent(props) {
	const {
		children,
		squeeze,
		screenWidth,
		width,
		SideBar,
		buttonBackgroundColor,
		buttonColor,
		buttonLabel,
		buttonPosition,
		buttonStyle,
		buttonContainerStyle,
		resizeMode='contain',
		iconSource,
		iconHeight=30,
		iconWidth=30,
		imageStyle,
		touchableStyle,
		rotateYdegree
	} = props;
	const [menuToggle, setMenuToggle] = useState(false);

	const SCREEN_WIDTH = screenWidth || DEVICE_SCREEN_WIDTH;
	const SIDEBAR_WIDTH = width || DEFAULT_SIDEBAR_WIDTH;
	const MAIN_WIDTH = SCREEN_WIDTH - SIDEBAR_WIDTH;
	const MAIN_SCALED = MAIN_WIDTH / SCREEN_WIDTH;

	const scaleValue = useRef(new Animated.Value(1)).current;
	const translateValue = useRef(new Animated.Value(0)).current;


	const getTransform = () => {
		if (squeeze) {
			let transform = {
				transform: [{ scaleX: scaleValue }]
			};
			return withAnchorPoint(transform, { x: 1, y: 1 }, { width: SCREEN_WIDTH, height: DEVICE_SCREEN_HEIGHT });
		}
		return {
			transform: [{ translateX: translateValue }]
		};
	};


	let iconStyle ={
		transform: [{ rotateY: menuToggle ? rotateYdegree :'0deg' }],
		...imageStyle
	};


	const toggleMenu = () => {
		if (squeeze) {
			Animated.timing(scaleValue, {
				toValue: menuToggle ? 1 : MAIN_SCALED,
				useNativeDriver: true,
				duration: 100
			}).start(() => setMenuToggle(prev => !prev));
		} else {
			Animated.timing(translateValue, {
				toValue: menuToggle ? 0 : SIDEBAR_WIDTH,
				useNativeDriver: true,
				duration: 100
			}).start(() => setMenuToggle(prev => !prev));
		}
	};


	const renderButton = () => {
		return (
			<View style={[styles.buttonContainer, { top: buttonPosition || DEVICE_SCREEN_HEIGHT / 3 }, buttonContainerStyle]}>
				{iconSource ? <TouchableIcon
					resizeMode={resizeMode}
					source={iconSource}
					height={iconHeight}
					width={iconWidth}
					imageStyle={iconStyle}
					onPress={toggleMenu}
					touchableStyle={touchableStyle}
				/> :
					<Button
						label={buttonLabel || '>'}
						onPress={toggleMenu}
						textColor={buttonBackgroundColor || 'salmon'}
						color={buttonColor || 'black'}
						style={buttonStyle}
					/>}
			</View>
		);
	};

	return (
		<View style={[styles.container, { width: SCREEN_WIDTH }]}>
			{menuToggle && (
				<ScrollView style={{ width: SIDEBAR_WIDTH, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
					<SideBar visible={menuToggle} />
				</ScrollView>
			)}
			<Animated.View style={({ width: MAIN_WIDTH }, [getTransform()])}>
				{children}
				{renderButton()}
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row'
	},
	buttonContainer: {
		position: 'absolute',
		left: 0
	}
});

DrawerComponent.propTypes = {
	children: PropTypes.element.isRequired,
	SideBar: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
	buttonBackgroundColor: PropTypes.string,
	buttonColor: PropTypes.string,
	buttonLabel: PropTypes.string,
	buttonPosition: PropTypes.number,
	width: PropTypes.number,
	screenWidth: PropTypes.number,
	squeeze: PropTypes.bool,
	buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	buttonContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	touchableStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	iconHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	iconWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	iconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
	imageStyle: PropTypes.object,
	resizeMode: PropTypes.string,
	rotateYdegree: PropTypes.string
};

export default DrawerComponent;
