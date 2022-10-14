import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Panda Imports
import {
	Button,
	DoubleCard
} from 'react-native-panda-ui';

import StyledSelect from '../components/StyledSelect';
import { ButtonText } from '../components/StyledText';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import {
	useThemeContext,
	themeSelector,
	baseThemeSelector,
	characterSelector
} from '../contexts/ThemeContext';
import { getCharacters } from '../utils/apiHandler';

const ThemeSelect = () => {
	const [userSession, dispatch] = useThemeContext();
	const theme = themeSelector(userSession);
	const baseTheme = baseThemeSelector(userSession);
	const character = characterSelector(userSession);
	const [characterData, setCharacterData] = useState([]);

	const updateTheme = async () => {
		dispatch({ type: 'SET_THEME', payload: { id: character.id, animal: character.animal, theme: character.theme } });
	};

	useEffect(() => {
		(async () => {
			const charData = await getCharacters();
			// console.log(charData.data.characters);
			setCharacterData(charData.data.characters);
		})();
	}, [character, theme]);

	return (
		<View style={{ height: 100, width: '95%', marginVertical: 15 }}>
			<DoubleCard
				backCardElevation={5}
				cardElevation={8}
				borderRadius={Styles[theme].borderRadius}
				backCardColor={Colors[theme].backCardColor}
				backCardGradient={Colors[theme].backCardGradient}
				cardColor={Colors[theme].cardColor}
				padding={Styles[theme].padding}
			>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
					<View style={{ borderWidth: Styles[theme].accentBorderWidth, borderColor: Colors[theme].borderColor, borderRadius: Styles[theme].borderRadius, marginRight: 8, width: '60%' }}>
						<StyledSelect
							onValueChange={(itemValue, itemIndex) => {
								dispatch({ type: 'SET_THEME', payload: { id: characterData[itemIndex -1]?.id, animal: characterData[itemIndex -1]?.animal, theme: itemValue } });
							}}
							items={
								characterData.map((c, i) => {
									return {
										label: c.animal,
										value: c.theme,
										key: c.id
									};
								})
							}
							selectedValue={baseTheme}
							value={character.theme}
							validationErrorColor={Colors[theme].validationError}
							textColor={Colors[theme].borderColor}
							backgroundColor={Colors[theme].cardColor}
						/>
					</View>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Button
							// label="APPLY"
							iconElement={<FontAwesome5 name="search" size={15} color={Colors[theme].buttonTextColor} />}
							textElement={<ButtonText buttonTextColor={Colors[theme].buttonTextColor}>APPLY</ButtonText>}
							onPress={() => updateTheme()}
							// style={{ padding: 5 }}
							width={110}
							height={42}
							borderRadius={Styles[theme].borderRadius}
							textColor={Colors[theme].buttonTextColor}
							color={Colors[theme].buttonColor}
							solid={true}
							border={true}
							borderWidth={Styles[theme].buttonBorderWidth}
							gradient={Colors[theme].buttonGradient}
						/>
					</View>
				</View>
			</DoubleCard>
		</View>
	);
};

export default ThemeSelect;
