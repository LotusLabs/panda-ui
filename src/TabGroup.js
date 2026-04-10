import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';

import Icon from '@expo/vector-icons/FontAwesome';

import Button from './Button';



const TabGroup = (props) => {
	const {
		options,
		width,
		selectedValue,
		onValueChange,
		style,
		// props passed through to <Button>
		buttonStyle,
		disabled,
		disabledColor='lightgrey',
		size,
		height,
		color,
		chevronColor='#000',
		activeTextColor,
		inactiveTextColor=activeTextColor,
		scrollButtons=false,
		backgroundColor
	} = props;

	const displayColor = disabled ? disabledColor : color;
	const [showLeftChevron, setShowLeftChevron] = useState(false);
	const [showRightChevron, setShowRightChevron] = useState(false);
	const scrollElRef = useRef();

	const componentStyle = {
		paddingHorizontal: 2.5,
		backgroundColor,
		...style,
		// flexGrow: 1,
		flexDirection: 'row',
		width: width || '100%',
		height: height || '100%'
	};

	const selectedStyle = {
		...componentStyle,
		marginBottom: 0,
		borderBottomWidth: 1,
		borderBottomColor: displayColor
	};

	const buttonLeftStyle = {
		paddingHorizontal: 2.5,
		...buttonStyle,
		flexGrow: 1
	};
	const buttonNotLeftStyle = {
		...buttonLeftStyle,
		borderLeftWidth: 0
	};

	const buttonSelectedLeftStyle = {
		...buttonLeftStyle,
		...selectedStyle,
		flexGrow: 1
	};
	const buttonSelectedNotLeftStyle = {
		...buttonNotLeftStyle,
		...selectedStyle,
		flexGrow: 1
	};

	const handleScroll = (event) => {
		const positionX = event.nativeEvent.contentOffset.x;
		const outerWidth = event.nativeEvent.layoutMeasurement.width;
		const innerWidth = event.nativeEvent.contentSize.width;
		const positionXRemaining = innerWidth - outerWidth - positionX;

		setShowLeftChevron(positionX > 20);
		setShowRightChevron(positionXRemaining > 20);
	};

	// On mount trigger a small scroll so that the left and right chevrons display correctly.
	// This is a hacky way to do this, but we're not sure how to read the correct dimensions
	// outside of a scroll event.
	useEffect(() => {
		scrollElRef.current.scrollTo({ x: 1 });
	}, []);

	return (
		<View
			style={componentStyle}
		>

			{scrollButtons && showLeftChevron &&
				<Button
					iconElement={<Icon name="chevron-left" size={14} color={chevronColor} />}
					size="small"
					height={height}
					width={10}
					solid={false}
					style={{ marginLeft: 2, justifyContent: 'center' }}
					disabled
					border={false}
					transparent
					onPress={() => ({}) }
					key="left-arrow"
				/>
			}
			<ScrollView
				ref={scrollElRef}
				onScroll={handleScroll}
				horizontal={true}
				fadingEdgeLength={scrollButtons ? 150 : 0}
				indicatorStyle="black"
				contentContainerStyle={{ flexGrow: 1, height: height || '100%', padding: 0, alignItems: 'space-between' }}
			>
				{options.map((option, i) => {
					const selected = option.value === selectedValue;
					return (
						<Button
							icon={option.icon}
							label={option.label}
							transparent={true}
							solid={false}
							allowInteraction={!selected}
							size={size}
							height={height}
							disabled={disabled}
							border={false}
							color={selected ? color : inactiveTextColor}
							textColor={selected ? activeTextColor : inactiveTextColor}
							style={i === 0
								? selected ? buttonSelectedLeftStyle : buttonLeftStyle
								: selected ? buttonSelectedNotLeftStyle : buttonNotLeftStyle}
							onPress={() => onValueChange(option.value)}
							key={option.value}
							gradient={[]}
						/>
					);
				})}
			</ScrollView>

			{scrollButtons && showRightChevron &&
				<Button
					iconElement={<Icon name="chevron-right" size={14} color={chevronColor} />}
					size="small"
					height={height}
					width={10}
					solid={false}
					style={{ marginRight: 2, justifyContent: 'center' }}
					transparent
					disabled
					border={false}
					onPress={() => ({}) }
					key="right-arrow"
				/>
			}
		</View>
	);
};

export default TabGroup;

TabGroup.propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any.isRequired,
		label: PropTypes.string,
		icon: PropTypes.string
	})).isRequired,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	height: PropTypes.number,
	selectedColor: PropTypes.string,
	selectedValue: PropTypes.string,
	disabledColor: PropTypes.string,
	// selectedValue: PropTypes.any.isRequired,
	onValueChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	scrollButtons: PropTypes.bool,
	size: PropTypes.oneOf(['small', 'standard', 'large']),
	color: PropTypes.string,
	activeTextColor: PropTypes.string,
	inactiveTextColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	chevronColor: PropTypes.string,
	style: PropTypes.object,
	buttonStyle: PropTypes.object,
	theme: PropTypes.string
};
