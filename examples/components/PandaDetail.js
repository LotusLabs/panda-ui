import React from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SvgCss } from 'react-native-svg';

import { H1, H3, Body2 } from '../components/StyledText';
import Colors from '../constants/Colors';
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';

const PandaDetail = ({ qualitiesData }) => {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);

	const navigation = useNavigation();

	const navigateToHelp = (qualitiesData) => {
		// navigation.navigate('HomeStack', {
		// 	screen: 'Help'
		// });
		navigation.navigate('Help');
	};

	return (
		<View style={{ flex: 1, alignItems: 'center' }}>
			<View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
				<H1 textColor={Colors[theme].textColor} style={{ textAlign: 'left' }}>{qualitiesData.name}</H1>
			</View>
			<View style={{ flexDirection: 'column', justifyContent: 'center' }}>
				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
					<TouchableOpacity
						onPress={() => {
							navigateToHelp(qualitiesData);
						}}
						style={{ flexDirection: 'column', marginLeft: 5, marginVertical: 5 }}
					>
						{qualitiesData.svgImage ?
							<View style={{ width: '100%', alignItems: 'center' }}>
								<SvgCss xml={qualitiesData.svgImage}
									height="120" width="120"
									style={{ height: Platform.OS === 'ios' ? 120 : 120, width: 250, marginBottom: 10, resizeMode: 'contain' }}
								/>
							</View>
							:
							<View
								style={{ height: 120, width: 120 }}
							/>
						}
						{qualitiesData.animal &&
							<View style={{ width: '80%', flexDirection: 'row' }}>
								<H3 textColor={Colors[theme].textColor} style={{ marginRight: 5 }}>Animal:</H3>
								<Body2 textColor={Colors[theme].textColor}>{qualitiesData.animal}</Body2>
							</View>
						}
						{qualitiesData.color &&
							<View style={{ width: '80%', flexDirection: 'row' }}>
								<H3 textColor={Colors[theme].textColor} style={{ marginRight: 5 }}>Color:</H3>
								<Body2 textColor={Colors[theme].textColor}>{qualitiesData.color}</Body2>
							</View>
						}
						{qualitiesData.faveFood &&
							<View style={{ width: '80%', flexDirection: 'row' }}>
								<H3 textColor={Colors[theme].textColor} style={{ marginRight: 5 }}>Fave Food:</H3>
								<Body2 textColor={Colors[theme].textColor}>{qualitiesData.faveFood}</Body2>
							</View>
						}
						{qualitiesData.peeves &&
							<View style={{ width: '80%', flexDirection: 'row' }}>
								<H3 textColor={Colors[theme].textColor} style={{ marginRight: 5 }}>Peeves:</H3>
								<Body2 textColor={Colors[theme].textColor}>{qualitiesData.peeves}</Body2>
							</View>
						}
						{qualitiesData.loves &&
							<View style={{ width: '80%', flexDirection: 'row', marginBottom: 30 }}>
								<H3 textColor={Colors[theme].textColor} style={{ marginRight: 5 }}>Loves:</H3>
								<Body2 textColor={Colors[theme].textColor}>{qualitiesData.loves}</Body2>
							</View>
						}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default PandaDetail;
