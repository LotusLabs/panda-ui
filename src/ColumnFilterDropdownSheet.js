import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TouchableOpacity from './TouchableOpacity';

function normalizeSelectedValues(filterValue) {
	if (Array.isArray(filterValue)) {
		return filterValue.map(value => String(value));
	}

	if (filterValue == null || filterValue === '') {
		return [];
	}

	return [String(filterValue)];
}

function ColumnFilterDropdownSheet({ options = [], filterValue, onChange, onClear, indicatorColor }) {
	const [selectedValues, setSelectedValues] = useState(() => normalizeSelectedValues(filterValue));
	const hasFilter = selectedValues.length > 0;

	const toggleValue = value => {
		const valueString = String(value);
		setSelectedValues(current =>
			current.includes(valueString) ? current.filter(item => item !== valueString) : [...current, valueString]
		);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator
			>
				{options.length ? (
					options.map(option => {
						const { value, label } = typeof option === 'object' ? option : { value: option, label: option };
						const isSelected = selectedValues.includes(String(value));

						return (
							<Pressable
								key={String(value)}
								style={({ pressed }) => [styles.optionRow, pressed && styles.optionRowPressed]}
								onPress={() => toggleValue(value)}
							>
								<FontAwesome
									name={isSelected ? 'check-square' : 'square-o'}
									size={18}
									color={isSelected ? indicatorColor : '#999'}
								/>
								<Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>{label}</Text>
							</Pressable>
						);
					})
				) : (
					<Text style={styles.emptyText}>No filter options available</Text>
				)}
			</ScrollView>
			<View style={styles.footer}>
				{hasFilter && (
					<TouchableOpacity style={styles.actionButton} onPress={onClear}>
						<Text style={[styles.actionText, { color: indicatorColor }]}>Clear</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity
					style={[styles.actionButton, styles.applyButton, { backgroundColor: indicatorColor }]}
					onPress={() => onChange(selectedValues)}
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
		paddingVertical: 8
	},
	optionRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#E8E8E8'
	},
	optionRowPressed: {
		backgroundColor: '#F5F5F5'
	},
	optionLabel: {
		marginLeft: 12,
		fontSize: 16,
		color: '#22282F'
	},
	optionLabelSelected: {
		fontWeight: '600',
		color: '#3C7378'
	},
	emptyText: {
		padding: 20,
		fontSize: 14,
		color: '#666',
		textAlign: 'center'
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: '#D8D8D8'
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
		borderRadius: 6
	},
	applyText: {
		color: '#fff',
		fontWeight: '600'
	}
});

export default ColumnFilterDropdownSheet;
