import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TextInputNext from './TextInputNext';
import TouchableOpacity from './TouchableOpacity';

function ColumnFilterSheet({ columnLabel, filterValue, onChange, onClear, buttonBackgroundColor }) {
	const [filterInput, setFilterInput] = useState(filterValue || '');
	const hasFilter = Boolean(filterValue?.trim());

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator
			>
				<TextInputNext
					value={filterInput}
					containerStyle={styles.filterInput}
					placeholder={`Search ${columnLabel}`}
					backgroundColor="#fff"
					onChangeText={setFilterInput}
					onSubmitEditing={() => onChange(filterInput)}
					returnKeyType="search"
					autoCapitalize="none"
					autoFocus
				/>
			</ScrollView>
			<View style={styles.footer}>
				{hasFilter && (
					<TouchableOpacity style={styles.actionButton} onPress={onClear}>
						<Text style={[styles.actionText, { color: buttonBackgroundColor }]}>Clear</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity
					style={[styles.actionButton, styles.applyButton, { backgroundColor: buttonBackgroundColor }]}
					onPress={() => onChange(filterInput)}
				>
					<Text style={[styles.actionText, styles.applyText]}>Apply</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		minHeight: 0
	},
	scrollView: {
		flex: 1
	},
	scrollContent: {
		padding: 16,
		paddingBottom: 8
	},
	filterInput: {
		width: '100%'
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderTopWidth: 0.5,
		borderTopColor: '#D8D8D8',
		backgroundColor: '#fff'
	},
	actionButton: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginLeft: 8
	},
	actionText: {
		fontSize: 14,
		color: '#666'
	},
	applyButton: {
		backgroundColor: '#3C7378',
		borderRadius: 6
	},
	applyText: {
		color: '#fff',
		fontWeight: '600'
	}
});

export default ColumnFilterSheet;
