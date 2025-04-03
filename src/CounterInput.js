import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Card from './Card';

const CounterInput = props => {
	const {
		value,
		onChange,
		renderLabel,
		counterColor = '#000',
		containerStyle,
		backCardColor,
		backCardGradient,
		incrementBackgroundColor = '#fff',
		decrementBackgroundColor = '#fff',
		incrementTextColor = '#000',
		decrementTextColor = '#000',
		variationNumberOfCards = 1,
		cardPadding = 10,
		size = 'standard',
		borderRadius = 50
	} = props;

	const increment = () => onChange(value + 1);
	const decrement = () => onChange(value - 1);

	const labelStyle = {
		color: counterColor,
		// paddingHorizontal: size === 'large' ? 55 : size === 'standard' ? 45 : 35,
		fontSize: size === 'large' ? 56 : size === 'standard' ? 46 : 36,
		width: '100%',
		textAlign: 'center'
	};
	const container = {
		flexDirection: 'row',
		alignItems: 'center',
		padding: cardPadding / 2,
		...containerStyle
	};

	return (
		<View style={container}>
			{variationNumberOfCards === 2 ? (
				<Card
					backgroundColor={backCardColor}
					elevation={5}
					height={size === 'large' ? 50 : size === 'standard' ? 40 : 35}
					width={size === 'large' ? 50 : size === 'standard' ? 40 : 35}
					style={{ alignItems: 'center', justifyContent: 'center' }}
					borderRadius={borderRadius}
					gradient={backCardGradient && backCardGradient.length > 1 ? backCardGradient : []}
				>
					<Card
						backgroundColor={incrementBackgroundColor}
						elevation={8}
						height={size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding}
						width={size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding}
						style={{ alignItems: 'center', justifyContent: 'center', marginBottom: cardPadding / 2 }}
						borderRadius={borderRadius}
						onPress={decrement}
					>
						<View
							style={{
								backgroundColor: decrementBackgroundColor,
								height: size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding,
								width: size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding,
								overflow: 'hidden',
								borderRadius: borderRadius,
								alignSelf: 'center',
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: size === 'large' ? 4.5 : size === 'standard' ? 3.5 : 2.5
							}}
						>
							<FontAwesome5
								size={size === 'large' ? 21 : size === 'standard' ? 16 : 11}
								name="minus"
								color={decrementTextColor}
							/>
						</View>
					</Card>
				</Card>
			) : (
				<Card
					backgroundColor={backCardColor}
					elevation={5}
					height={size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding}
					width={size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding}
					style={{ alignItems: 'center', justifyContent: 'center' }}
					borderRadius={borderRadius}
					onPress={decrement}
				>
					<View
						style={{
							backgroundColor: decrementBackgroundColor,
							height: size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding,
							width: size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding,
							overflow: 'hidden',
							borderRadius: borderRadius,
							alignSelf: 'center',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<FontAwesome5
							size={size === 'large' ? 21 : size === 'standard' ? 16 : 11}
							name="minus"
							color={decrementTextColor}
						/>
					</View>
				</Card>
			)}
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					width: size === 'large' ? 120 : size === 'standard' ? 100 : 70,
					margin: 'auto',
					textAlign: 'center'
				}}
			>
				<Text style={labelStyle}>{renderLabel ? renderLabel(value) : value}</Text>
			</View>
			{variationNumberOfCards === 2 ? (
				<Card
					backgroundColor={backCardColor}
					gradient={backCardGradient && backCardGradient.length > 1 ? backCardGradient : []}
					elevation={5}
					height={size === 'large' ? 50 : size === 'standard' ? 40 : 35}
					width={size === 'large' ? 50 : size === 'standard' ? 40 : 35}
					style={{ alignItems: 'center', justifyContent: 'center' }}
					borderRadius={borderRadius}
				>
					<Card
						solid={false}
						backgroundColor={incrementBackgroundColor}
						elevation={8}
						height={size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding}
						width={size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding}
						style={{ alignItems: 'center', justifyContent: 'center', marginBottom: cardPadding / 2 }}
						borderRadius={borderRadius}
						onPress={increment}
					>
						<View
							style={{
								backgroundColor: incrementBackgroundColor,
								height: size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding,
								width: size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding,
								overflow: 'hidden',
								borderRadius: borderRadius,
								alignSelf: 'center',
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: size === 'large' ? 4.5 : size === 'standard' ? 3.5 : 2.5
							}}
						>
							<FontAwesome5
								size={size === 'large' ? 21 : size === 'standard' ? 16 : 11}
								name="plus"
								color={incrementTextColor}
							/>
						</View>
					</Card>
				</Card>
			) : (
				<Card
					backgroundColor={backCardColor}
					elevation={5}
					height={size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding}
					width={size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding}
					style={{ alignItems: 'center', justifyContent: 'center' }}
					borderRadius={borderRadius}
					onPress={increment}
				>
					<View
						style={{
							backgroundColor: incrementBackgroundColor,
							height: size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding,
							width: size === 'large' ? 50 - cardPadding : size === 'standard' ? 40 - cardPadding : 35 - cardPadding,
							overflow: 'hidden',
							borderRadius: borderRadius,
							alignSelf: 'center',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<FontAwesome5
							size={size === 'large' ? 21 : size === 'standard' ? 16 : 11}
							name="plus"
							color={incrementTextColor}
						/>
					</View>
				</Card>
			)}
		</View>
	);
};

CounterInput.propTypes = {
	value: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	renderLabel: PropTypes.func,
	counterColor: PropTypes.string,
	textColor: PropTypes.string,
	backCardColor: PropTypes.string,
	backCardGradient: PropTypes.array,
	incrementBackgroundColor: PropTypes.string,
	decrementBackgroundColor: PropTypes.string,
	incrementTextColor: PropTypes.string,
	decrementTextColor: PropTypes.string,
	containerStyle: PropTypes.object,
	variationNumberOfCards: PropTypes.number,
	cardPadding: PropTypes.number,
	size: PropTypes.oneOf(['small', 'standard', 'large']),
	borderRadius: PropTypes.number
};

export default CounterInput;
