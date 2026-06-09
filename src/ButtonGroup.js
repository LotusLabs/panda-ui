import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

function ButtonGroup(props) {
	const {
		buttonGroupSelectedBackgroundColor,
		buttonGroupSeparatorColor,
		buttonGroupBackgroundColor,
		buttonLabels,
		selectedIndex,
		selectIndex,
		labelColor,
		labelColorSelected,
		labelSize,
		buttonWidth,
		isbuttonSeparator = true,
		fontWeight = '600',
		selectedIndexHight = 30,
		customButtonStyle,
		buttonContainerStyle,
		badgeBackgroundColor = 'rgba(0, 0, 0, 0.1)',
		badgeTextColor
	} = props;

	const lastIndex = buttonLabels.length - 1;

	const renderButtons = () => {
		return buttonLabels.map((labelValue, index) => {
			let buttonSeparator = {
				borderRightWidth: 1,
				borderRightColor: 'transparent'
			};
			if (lastIndex !== index && (index < selectedIndex - 1 || index > selectedIndex)) {
				buttonSeparator = {
					borderRightWidth: 1,
					borderRightColor: buttonGroupSeparatorColor || 'grey'
				};
			}

			const textColor = index === selectedIndex ? labelColorSelected : labelColor;

			return (
				<TouchableOpacity
					key={labelValue.value}
					style={[
						styles.buttonContainer,
						isbuttonSeparator && buttonSeparator,
						{ width: buttonWidth || 'auto' },
						(index === 0 || selectedIndex === index) && styles.buttonRadiusLeft,
						(lastIndex === index || selectedIndex === index) && styles.buttonRadiusRight,
						selectedIndex === index && {
							height: selectedIndexHight,
							backgroundColor: buttonGroupSelectedBackgroundColor || 'pink'
						},
						customButtonStyle
					]}
					onPress={() => onSelect(index)}
				>
					<View style={styles.labelContainer}>
						<Text
							style={{
								fontSize: labelSize || 14,
								color: textColor || 'black',
								fontWeight: fontWeight
							}}
						>
							{labelValue.label}
						</Text>
						{labelValue.badgeCount !== undefined ? (
							<View style={[styles.badgeContainer, { backgroundColor: badgeBackgroundColor }]}>
								<Text style={[styles.badgeText, { color: badgeTextColor || labelColor || 'black' }]}>
									{labelValue.badgeCount}
								</Text>
							</View>
						) : null}
					</View>
				</TouchableOpacity>
			);
		});
	};

	const onSelect = index => {
		selectIndex(index);
	};

	return (
		<View
			style={[
				styles.container,
				styles.buttonRadiusLeft,
				styles.buttonRadiusRight,
				{ backgroundColor: buttonGroupBackgroundColor || 'salmon' },
				buttonContainerStyle
			]}
		>
			{renderButtons()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 34,
		paddingHorizontal: 2
	},
	buttonContainer: {
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	labelContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	badgeContainer: {
		minWidth: 22,
		height: 22,
		marginLeft: 5,
		paddingHorizontal: 6,
		borderRadius: 11,
		alignItems: 'center',
		justifyContent: 'center'
	},
	badgeText: {
		fontSize: 12,
		fontWeight: '600'
	},
	buttonRadiusLeft: {
		borderTopLeftRadius: 7,
		borderBottomLeftRadius: 7
	},
	buttonRadiusRight: {
		borderTopRightRadius: 7,
		borderBottomRightRadius: 7
	}
});

ButtonGroup.propTypes = {
	selectIndex: PropTypes.func,
	selectedIndex: PropTypes.number,
	buttonGroupBackgroundColor: PropTypes.string,
	buttonGroupSelectedBackgroundColor: PropTypes.string,
	buttonLabels: PropTypes.array,
	labelColor: PropTypes.string,
	labelSize: PropTypes.number,
	buttonWidth: PropTypes.number,
	buttonGroupSeparatorColor: PropTypes.string,
	labelColorSelected: PropTypes.string,
	selectedIndexHight: PropTypes.number,
	buttonSeparator: PropTypes.object,
	buttonContainerStyle: PropTypes.object,
	customButtonStyle: PropTypes.object,
	isbuttonSeparator: PropTypes.bool,
	fontWeight: PropTypes.string,
	badgeBackgroundColor: PropTypes.string,
	badgeTextColor: PropTypes.string
};

export default ButtonGroup;
