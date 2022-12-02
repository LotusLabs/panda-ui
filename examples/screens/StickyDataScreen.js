// React Imports
import React, { useState, useEffect } from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet
} from 'react-native';

// Expo imports
import { StatusBar } from 'expo-status-bar';

// Panda Imports
import {
	DoubleCard,
	useSortedData,
	ScanTextInput,
	StickyColumnTable
} from 'react-native-panda-ui';

// Local Imports
import {
	useThemeContext,
	themeSelector
} from '../contexts/ThemeContext';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import LoadingIndicator from '../components/LoadingIndicator';
import { ButtonText } from '../components/StyledText';
import { getCharacters, getCharacterQualities } from '../utils/apiHandler';

const stickyColumns = [
	{ key: 'name',		label: 'Name', 		icon: null, width: 1, textAlign: 'left' },
	{ key: 'color',		label: 'Color', 	icon: null, width: 1, textAlign: 'left' },
	{ key: 'faveFood',	label: 'FaveFood', 	icon: null, width: 2, textAlign: 'left' },
	{ key: 'peeves',	label: 'Peeves', 	icon: null, width: 1, textAlign: 'left' },
	{ key: 'loves',		label: 'Loves', 	icon: null, width: 2, textAlign: 'left' }
];

const stickyColumn = {
	key: 'animal',		label: 'Animal', 		icon: null, width: 1, textAlign: 'left'
};

const defaultSortConfig = {
	key: stickyColumn.key,
	direction: 'asc'
};


const DataScreen = () => {
	const [userSession] = useThemeContext();
	const theme = themeSelector(userSession);
	// state hooks
	// useState utilizes the current state and a function that updates it
	const [qualitiesData, setQualitiesData] 					= useState([]);
	const [loading, setLoading] 								= useState(false);
	const [stickySortConfig, setStickySortConfig] 				= useState(defaultSortConfig);

	// hooks
	const stickySortedApiData = useSortedData(qualitiesData, stickySortConfig);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const response = await getCharacterQualities();
			// console.log('response', response.data.qualities);
			setQualitiesData(response.data.qualities);
			setLoading(false);
		})();
	}, []);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginTop: StatusBar.height,
			backgroundColor: Colors[theme].backgroundColor,
			alignItems: 'center'
		}
	});

	if (loading) {
		return (
			<LoadingIndicator
				activityIndicatorColor={Colors[theme].activityIndicatorColor}
				backgroundColor={Colors[theme].backgroundColor}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			{/* <View
				style={{ marginTop: 15, width: '95%' }}>
				<DoubleCard
					backCardElevation={5}
					cardElevation={8}
					borderRadius={Styles[theme].borderRadius}
					padding={Styles[theme].padding}
					backCardColor={Colors[theme].backCardColor}
					backCardGradient={Colors[theme].backCardGradient}
					cardColor={Colors[theme].cardColor}
				>
					<ScanTextInput
						onSubmit={() => {}}
						style={{ height: 30, width: '80%' }}
						width="95%"
						inactiveKeyboardIconColor="grey"
						textElement={<ButtonText style={{ marginRight: 10 }} buttonTextColor={Colors[theme].buttonColor}>Scan</ButtonText>}
					/>
				</DoubleCard>
			</View> */}
			<View
				style={{ marginBottom: 30, height: 180, width: '95%' }}>
				<StickyColumnTable
					data={stickySortedApiData}
					columns={stickyColumns}
					sortConfig={stickySortConfig}
					onSortChange={setStickySortConfig}
					stickyHeaderOptions={stickyColumn}
					headerHeight={40}
					rowHeight={50}
					headerTextColor={Colors[theme].buttonTextColor}
					textColor={Colors[theme].textColor}
					defaultSortConfig={defaultSortConfig}
					borderRadius={Styles[theme].borderRadius}
					headerBackgroundColor={Colors[theme].tintColor}
					backgroundColor={Colors[theme].cardColor}
					sortIndicatorColor={Colors[theme].buttonTextColor}
					borderColor={Colors[theme].tintColor}
					selectedColor={Colors[theme].tabBarActiveColor}
					scrollArrowColor={Colors[theme].buttonTextColor}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DataScreen;
