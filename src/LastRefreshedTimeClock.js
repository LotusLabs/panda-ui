import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as StyledText from './StyledText';
import TouchableOpacity from './TouchableOpacity';
import BasicImage from './BasicImage';
import { View } from 'react-native';
import PropTypes from 'prop-types';

function LastRefreshedTimeClock({ lastRefreshed, onPress }) {
	const [timeStamp, setTimeStamp] = useState('');
	useFocusEffect(
		useCallback(() => {
			setTimeStamp(Date.now());
			const currentTimer = setInterval(() => {
				setTimeStamp(Date.now());
			}, 60000);

			return () => clearInterval(currentTimer);
		}, [])
	);

	const formatTimeStampForHeader = (timeStamp, currentTimeStamp) => {
		const timeDiff = Math.floor(currentTimeStamp / 1000) - Math.floor(timeStamp / 1000);
		if (timeDiff <= 60) return 'few seconds ago';
		if (timeDiff > 60 && timeDiff < 3600) return `${Math.floor(timeDiff / 60)} minute(s) ago`;
		if (timeDiff > 3600) return `${Math.floor(timeDiff / 3600)} hour(s) ago`;
		console.log(timeDiff);
		return timeDiff;
	};

	return (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<TouchableOpacity onPress={onPress}>
				<BasicImage
					source={require('../assets/images/common/refreshgreen.png')}
					height={25}
					width={25}
					style={{ marginRight: 10 }}
				/>
			</TouchableOpacity>

			<StyledText.Body2>
				Last Refresh : {lastRefreshed ? formatTimeStampForHeader(lastRefreshed, timeStamp) : ''}
			</StyledText.Body2>
		</View>
	);
}

export default LastRefreshedTimeClock;

LastRefreshedTimeClock.propTypes = {
	lastRefreshed: PropTypes.number,
	onPress: PropTypes.func
};
