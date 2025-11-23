import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Platform,
	StyleSheet
} from 'react-native';

import Picker from './Picker';
import Button from './Button';

const SearchBar = (props) => {
	const {
		columns,
		data,
		onSubmit,
		borderColor='#772d4f',
		borderRadius=50,
		borderWidth=1,
		buttonColor='#772d4f',
		buttonTextColor='#772d4f',
		containerStyle,
		gradient
	} = props;
	const [searchType, setSearchType] = useState('');
	const [showSearchValues, setShowSearchValues] = useState(false);
	const [showButton, setShowButton] = useState(false);
	const [value, setValue] = useState('');

	const searchItems = useMemo(() => {
		let result = [];
		let values = [];
		if (data && columns && searchType) {
			values = data.map(item => {
				return item[searchType];
			});
		}

		// remove duplicates
		values = [...new Set(values)];
		// filter out falsy values.
		result = values.filter(Boolean);
		result = result.map(item => {
			return  { label: String(item), value: String(item) };
		});

		return result;
	}, [data, columns, searchType]);


	const handleSubmit = () => {
		return onSubmit(value, searchType);
	};


	const styles = StyleSheet.create({
		hiddenStyle: {
			display: 'none'
		},
		displayStyle: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: borderRadius
		},
		displayButtonStyle: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginRight: 10,
			marginTop: Platform.OS === 'ios' ? 0 : 10
		}
	});

	return (
		<View
			style={{
				paddingHorizontal: borderRadius > 5 ? 20 : 5,
				paddingVertical: borderRadius > 5 ? 20 : 10,
				width: '100%',
				minWidth: '90%',
				borderWidth: borderWidth,
				borderStyle: 'solid',
				borderColor: borderColor,
				borderRadius: borderRadius,
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<View style={{ flexDirection: 'row', containerStyle, alignItems: 'center', justifyContent: 'center' }}>
				<View style={{ marginRight: 4 }}>
					<Picker
						placeholder="Search by..."
						enableActionOnValueChange={true}
						onValueChange={(itemValue, itemIndex) => {
							setSearchType(itemValue);
							setShowSearchValues(true);
						}}
						items={columns}
						value={searchType}
					/>
				</View>
				<View style={showSearchValues ? styles.displayStyle : styles.hiddenStyle}>
					<Picker
						placeholder="Select value..."
						enableActionOnValueChange={true}
						onValueChange={(itemValue, itemIndex) => {
							setShowButton(true);
							setValue(itemValue);
						}}
						items={searchItems}
					/>
				</View>
				<View style={styles.displayButtonStyle}>
					{showButton && <Button
						onPress={() => handleSubmit()}
						label="SEARCH"
						style={{ paddingHorizontal: 10 }}
						transparent={true}
						borderWidth={1}
						color={buttonColor}
						textColor={buttonTextColor}
						borderRadius={borderRadius}
						gradient={gradient}
					/>}
				</View>
			</View>
		</View>
	);
};

SearchBar.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.any.isRequired,
		// Node can be string, React element, or anything renderable.
		value: PropTypes.node.isRequired
	})),
	data: PropTypes.array,
	onSubmit: PropTypes.func.isRequired,
	buttonColor: PropTypes.string,
	buttonTextColor: PropTypes.string,
	borderColor: PropTypes.string,
	borderWidth: PropTypes.number,
	borderRadius: PropTypes.number,
	caretSize: PropTypes.number,
	caretColor: PropTypes.string,
	containerStyle: PropTypes.object,
	gradient: PropTypes.array
};

export default SearchBar;
