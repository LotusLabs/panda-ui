import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView
} from 'react-native';

// Panda Imports
import {
	Card,
	Feedback
} from 'react-native-panda-ui';

import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import { H1 } from '../components/StyledText';


export default function OptnScreen() {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);

	const [rating, setRating] = useState(0);

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[theme].backgroundColor }}>
			<View style={[styles.header, { paddingTop: 6 }]}>
				<H1 textColor={Colors[theme].tintColor}>Panda UI</H1>
			</View>
			<View style={{ height: 170, width: '90%', marginTop: 20 }}>
				<Card
					elevation={5}
					borderRadius={50}
					backgroundColor={Colors[theme].backCardColor}
					style={{ alignItems: 'center', justifyContent: 'center' }}
				>
					<Card
						elevation={8}
						borderRadius={40}
						backgroundColor={Colors[theme].cardColor}
						style={{ alignItems: 'center', height: '85%', width: '95%' }}
					>
						<View style={{ height: 100, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
							<Feedback
								rating={rating}
								setRating={setRating}
								title={'How happy are you with Panda UI?'}
								theme="panda"
							/>
						</View>
					</Card>
				</Card>
			</View>
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
