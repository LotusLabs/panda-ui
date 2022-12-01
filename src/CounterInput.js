import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import ProIcon from 'react-native-vector-icons/FontAwesome5';

import Card from './Card';

const inputSizes = {
	small: 'small',
	standard: 'standard',
	large: 'large',
	xlarge: 'xlarge'
};

const sizes = {
	small:    { size: 35, width:  70, margin: 2.5, icon: 11, font: 36, lineHeight: 40, horizontalPadding: 0 },
	standard: { size: 40, width: 100, margin: 3.5, icon: 16, font: 46, lineHeight: 52, horizontalPadding: 0 },
	large:    { size: 50, width: 120, margin: 4.5, icon: 21, font: 56, lineHeight: 64, horizontalPadding: 5 },
	xlarge:   { size: 60, width: 200, margin: 5.5, icon: 30, font: 66, lineHeight: 76, horizontalPadding: 5 }
};

const CounterInput = (props) => {
	const {
		value,
		onChange,
		counterColor='#000',
		containerStyle,
		backCardColor,
		minusBackCardColor=backCardColor,
		plusBackCardColor=backCardColor,
		backCardGradient,
		incrementBackgroundColor='#fff',
		decrementBackgroundColor='#fff',
		incrementTextColor='#000',
		decrementTextColor='#000',
		variationNumberOfCards=1,
		cardPadding=5,
		size='standard',
		borderRadius=50
	} = props;

	const increment = () => onChange(value + 1);
	const decrement = () => onChange(value - 1);
	const container  = {
		flexDirection: 'row',
		alignItems: 'center',
		padding: cardPadding,
		...containerStyle
	};

	const backCardDimensionSize = sizes[size].size;
	const cardDimensionSize = sizes[size].size - (2 * cardPadding);
	const margin = sizes[size].margin;
	const iconSize = sizes[size].icon;
	const horizontalPadding = sizes[size].horizontalPadding;
	const componentWidth = sizes[size].width;

	const labelStyle = {
		color: counterColor,
		paddingHorizontal: horizontalPadding,
		fontSize: sizes[size].font,
		lineHeight: sizes[size].lineHeight,
		width: '100%',
		textAlign: 'center',
		border: 0
	};

	return (
		<View style={container}>
			{ variationNumberOfCards === 2 ?
				(
					<Card
						backgroundColor={minusBackCardColor || backCardColor}
						elevation={5}
						height={backCardDimensionSize}
						width={backCardDimensionSize}
						style={{ alignItems: 'center', justifyContent: 'center' }}
						borderRadius={borderRadius}
						gradient={backCardGradient && backCardGradient.length > 1 ? backCardGradient : []}
					>
						<Card
							backgroundColor={decrementBackgroundColor}
							elevation={8}
							height={cardDimensionSize}
							width={cardDimensionSize}
							style={{ alignItems: 'center', justifyContent: 'center', marginBottom: cardPadding }}
							borderRadius={Math.max(0, borderRadius - cardPadding)}
							onPress={decrement}
						>
							<View
								style={{
									backgroundColor: decrementBackgroundColor,
									height: cardDimensionSize,
									width: cardDimensionSize,
									overflow: 'hidden',
									borderRadius: borderRadius,
									alignSelf: 'center',
									alignItems: 'center',
									justifyContent: 'center',
									marginTop: margin }}
							>
								<ProIcon
									size={iconSize}
									name="minus"
									color={decrementTextColor}
								/>
							</View>
						</Card>
					</Card>
				) : (
					<Card
						backgroundColor={minusBackCardColor || backCardColor}
						elevation={5}
						height={cardDimensionSize}
						width={cardDimensionSize}
						style={{ alignItems: 'center', justifyContent: 'center' }}
						borderRadius={borderRadius}
						onPress={decrement}
					>
						<View
							style={{
								backgroundColor: decrementBackgroundColor,
								height: cardDimensionSize,
								width:  cardDimensionSize,
								overflow: 'hidden',
								borderRadius: borderRadius,
								alignSelf: 'center',
								alignItems: 'center',
								justifyContent: 'center' }}
						>

							<ProIcon
								size={iconSize}
								name="minus"
								color={decrementTextColor}
							/>
						</View>
					</Card>
				)
			}
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					width: componentWidth,
					margin: 'auto',
					textAlign: 'center'
				}}
			>

				<TextInput
					style={labelStyle}
					value={String(value || 0)}
					returnKeyType="go"
					onChangeText={text => {
						onChange(Number(text));
					}}
					keyboardType="numeric"
					autoCapitalize="none"
					autoCompleteType="off"
					autoCorrect={false}
				/>
			</View>
			{ variationNumberOfCards === 2 ?
				(
					<Card
						backgroundColor={plusBackCardColor || backCardColor}
						gradient={backCardGradient && backCardGradient.length > 1 ? backCardGradient : []}
						elevation={5}
						height={backCardDimensionSize}
						width={backCardDimensionSize}
						style={{ alignItems: 'center', justifyContent: 'center' }}
						borderRadius={borderRadius}
					>
						<Card
							solid={false}
							backgroundColor={incrementBackgroundColor}
							elevation={8}
							height={cardDimensionSize}
							width={cardDimensionSize}
							style={{ alignItems: 'center', justifyContent: 'center', marginBottom: cardPadding }}
							borderRadius={Math.max(0, borderRadius - cardPadding)}
							onPress={increment}
						>
							<View
								style={{
									backgroundColor: incrementBackgroundColor,
									height: cardDimensionSize,
									width: cardDimensionSize,
									overflow: 'hidden',
									borderRadius: borderRadius,
									alignSelf: 'center',
									alignItems: 'center',
									justifyContent: 'center',
									marginTop: margin }}
							>
								<ProIcon
									size={iconSize}
									name="plus"
									color={incrementTextColor}
								/>
							</View>
						</Card>
					</Card>
				) : (
					<Card
						backgroundColor={plusBackCardColor || backCardColor}
						elevation={5}
						height={cardDimensionSize}
						width={cardDimensionSize}
						style={{ alignItems: 'center', justifyContent: 'center' }}
						borderRadius={borderRadius}
						onPress={increment}
					>
						<View
							style={{
								backgroundColor: incrementBackgroundColor,
								height: cardDimensionSize,
								width: cardDimensionSize,
								overflow: 'hidden',
								borderRadius: borderRadius,
								alignSelf: 'center',
								alignItems: 'center',
								justifyContent: 'center' }}
						>
							<ProIcon
								size={iconSize}
								name="plus"
								color={incrementTextColor}
							/>
						</View>
					</Card>
				)
			}
		</View>
	);
};

CounterInput.propTypes = {
	value: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	counterColor: PropTypes.string,
	textColor: PropTypes.string,
	backCardColor: PropTypes.string,
	backCardGradient: PropTypes.array,
	plusBackCardColor: PropTypes.string,
	minusBackCardColor: PropTypes.string,
	incrementBackgroundColor: PropTypes.string,
	decrementBackgroundColor: PropTypes.string,
	incrementTextColor: PropTypes.string,
	decrementTextColor: PropTypes.string,
	containerStyle: PropTypes.object,
	variationNumberOfCards: PropTypes.number,
	cardPadding: PropTypes.number,
	size: PropTypes.oneOf([inputSizes.small, inputSizes.standard, inputSizes.large, inputSizes.xlarge]),
	borderRadius: PropTypes.number
};

export default CounterInput;
