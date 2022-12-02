import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

// Panda Imports
import {
	DoubleCard,
	Feedback
} from 'react-native-panda-ui';

import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import { H1, Body3 } from '../components/StyledText';


export default function HelpScreen() {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);

	const [rating, setRating] = useState(0);

	return (
		<SafeAreaView style={{ flex: 1, marginTop: StatusBar.height, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[theme].backgroundColor }}>
			<View style={[styles.header, { paddingTop: 6 }]}>
				<H1 textColor={Colors[theme].tintColor}>Panda UI</H1>
			</View>
			<View style={{ height: 170, width: '90%', marginTop: 20 }}>
				<DoubleCard
					backCardElevation={5}
					cardElevation={8}
					borderRadius={Styles[theme].borderRadius}
					padding={Styles[theme].padding}
					backCardColor={Colors[theme].backCardColor}
					backCardGradient={Colors[theme].backCardGradient}
					cardColor={Colors[theme].cardColor}
				>
					<View style={{ height: 100, width: '100%', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
						<Feedback
							rating={rating}
							setRating={setRating}
							title={'How happy are you with Panda UI?'}
							theme="panda"
						/>
					</View>
				</DoubleCard>
			</View>
			<View style={{ height: 170, width: '90%', marginTop: 20 }}>
				<DoubleCard
					backCardElevation={5}
					cardElevation={8}
					borderRadius={Styles[theme].borderRadius}
					padding={Styles[theme].padding}
					backCardColor={Colors[theme].backCardColor}
					backCardGradient={Colors[theme].backCardGradient}
					cardColor={Colors[theme].cardColor}
				>
					<View style={{ height: 100, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
						<Feedback
							rating={rating}
							setRating={setRating}
							title={'How happy are you with Panda UI?'}
						/>
					</View>
				</DoubleCard>
			</View>
			<Body3 style={{ textAlign: 'right' }} textColor={Colors[theme].textColor}>{`v${Constants.manifest.version}`}</Body3>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 2,
		width: '100%'
	},
	details: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 25,
		paddingVertical: 2,
		width: '100%'
	}
});
