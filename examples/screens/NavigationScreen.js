// React Imports
import React, { useState, useEffect } from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	Text
} from 'react-native';

// Panda Imports
import {
	Card,
	TabGroup
} from 'react-native-panda-ui';

// Local Imports
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import LoadingIndicator from '../components/LoadingIndicator';
import PandaDetail from '../components/PandaDetail';
import window from '../constants/Layout';
import { getCharacters, getCharacterQualities } from '../utils/apiHandler';


export default function NavigationScreen() {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);
	const [loading, setLoading] 				= useState(false);

	const [characterData, setCharacterData] 	= useState([]);
	const [qualitiesData, setQualitiesData] 	= useState([]);
	const [tab, setTab] 						= useState('1');

	const handleCharacterQualities = async (value) => {
		setLoading(true);
		const response = await getCharacterQualities(value);
		setQualitiesData(response);
		setLoading(false);
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Colors[theme].backgroundColor,
			alignItems: 'center'
		}
	});

	useEffect(() => {
		(async () => {
			setLoading(true);
			let response = await getCharacters();
			setCharacterData(response.data.characters);
			handleCharacterQualities(tab);
			setLoading(false);
		})();
	}, []);


	return (
		<SafeAreaView style={styles.container}>
			<View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
				<View style={{ width: '104%', height: window.height ? window.height : 800 }}>
					<Card
						elevation={5}
						borderTopLeftRadius={50}
						borderTopRightRadius={50}
						borderBottomLeftRadius={0}
						borderBottomRightRadius={0}
						backgroundColor={Colors[theme].cardColor}
						style={{ flex: 1, alignItems: 'center' }}
					>
						<View style={{ flex: 1, alignItems: 'center' }}>
							<TabGroup
								onValueChange={ async (value) => {
									setTab(value);
									handleCharacterQualities(value);
								}}
								style={{ height: 50, marginBottom: 10 }}
								size="small"
								selectedValue={tab}
								width="90%"
								height={50}
								activeTextColor={Colors[theme].borderColor}
								color={Colors[theme].borderColor}
								options={[{ label: 'AKIRA', value: '1' }, { label: 'YUKI', value: '2' }, { label: 'KENZO', value: '3' }, { label: 'TSUKI', value: '4' }, { label: 'KUMI', value: '5' }]}
							/>
							<Text>{window.height}</Text>
							<ScrollView style={{ flex: 1, width: '100%', marginTop: 25 }}>
								<View style={{ flex: 1, width: '100%' }}>
									{
										loading ?
											(
												<LoadingIndicator
													activityIndicatorColor={Colors[theme].activityIndicatorColor}
													backgroundColor={Colors[theme].cardColor}
													height={250}
												/>
											) : (
												<PandaDetail
													qualitiesData={qualitiesData}
												/>
											)
									}
								</View>
							</ScrollView>
						</View>
					</Card>
				</View>
			</View>
		</SafeAreaView>
	);
}
