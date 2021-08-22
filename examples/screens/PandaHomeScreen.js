// React Imports
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

// Third Party Imports
import Image from 'react-native-remote-svg';

// Local Imports
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import LoadingIndicator from '../components/LoadingIndicator';
import PandaDetail from '../components/PandaDetail';
import { Body3 } from '../components/StyledText';
import ThemeSelect from '../components/ThemeSelect';
import { getCharacters, getCharacterQualities } from '../utils/apiHandler';

const PandaHomeScreen = () => {

	const [userSession, dispatch] = useThemeContext();
	const theme = themeSelector(userSession);
	// state hooks
	// useState utilizes the current state and a function that updates it
	const [characterData, setCharacterData] 	= useState([]);
	const [qualitiesData, setQualitiesData] 	= useState([]);
	const [character, setCharacter]				= useState({ id: '0', animal: '' });
	const [loading, setLoading] 				= useState(false);

	useEffect(() => {
		setLoading(true);
		getCharacters().then((response) => {
			if (response) {
				setCharacterData(response.data.characters);
			} else {
				// toast.showError(response?.res_msg);
			}
		})
		.catch(() => {
			// toast.showError('There was an error getting characters.');
		})
		.finally(() => setLoading(false));
	}, []);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginTop: StatusBar.height,
			backgroundColor: Colors[theme].backgroundColor
		}
	});

	const updateTheme = async () => {
		setLoading(true);
		if (character.id > 0) {
			const response = await getCharacterQualities(character.id);
			setQualitiesData(response);
			dispatch({ type: 'SET_THEME', payload: { theme: response.theme } });
		} else {
			dispatch({ type: 'SET_THEME', payload: 'default' });
		}
		setLoading(false);
	};

	if (loading) {
		return (
			<LoadingIndicator
				activityIndicatorColor={Colors[theme].tintColor}
				backgroundColor={Colors[theme].backgroundColor}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<View style={{ flex: 1, margin: 10, marginTop: 8, alignItems: 'center', justifyContent: 'center' }}>
						<View style={{ width: '95%', alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={require('../assets/panda-ui-logo.png')}
								style={{ height: 150, resizeMode: 'contain' }}
							/>
						</View>
						<ThemeSelect
							character={character}
							setCharacter={setCharacter}
							characterData={characterData}
							onPress={updateTheme}
						/>
						<PandaDetail
							qualitiesData={qualitiesData}
						/>
					</View>
				</View>
			</ScrollView>
			<Body3 style={{ textAlign: 'right' }} textColor={Colors[theme].textColor}>{`v${Constants.manifest.version}`}</Body3>
		</SafeAreaView>
	);
};

export default PandaHomeScreen;