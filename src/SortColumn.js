import React, { useCallback, useEffect, useRef } from 'react';
import { TouchableOpacity, Platform, Text, View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Layout from './constants/Layout';
import StyledSelect from './StyledSelect';
import ColumnFilterInputSheet from './ColumnFilterInputSheet';
import ColumnFilterDropdownSheet from './ColumnFilterDropdownSheet';
import { usePickerSheet } from './contexts/PickerSheetContext';
import { isColumnFilterActive } from './utils/tableFilterUtils';

const FILTER_SHEET_OPEN_DELAY_MS = 300;

function ColumnIndicators({ sortKey, isSorted, sortDirection, hasFilter, showFilterIcon, sortIndicatorColor }) {
	return (
		<>
			{isSorted && sortDirection === 'asc' ? (
				<FontAwesome
					key={`${sortKey}-asc`}
					name="chevron-up"
					size={12}
					color={sortIndicatorColor}
					style={styles.indicator}
				/>
			) : null}
			{isSorted && sortDirection === 'desc' ? (
				<FontAwesome
					key={`${sortKey}-desc`}
					name="chevron-down"
					size={12}
					color={sortIndicatorColor}
					style={styles.indicator}
				/>
			) : null}
			{showFilterIcon && hasFilter ? (
				<FontAwesome
					key={`${sortKey}-filter`}
					name="filter"
					size={12}
					color={sortIndicatorColor}
					style={styles.indicator}
				/>
			) : null}
		</>
	);
}

const SortColumn = props => {
	const {
		column,
		i,
		columnCount,
		sortConfig,
		onSortChange,
		filterValue,
		onFilterChange,
		filterOptions = [],
		borderRadiusLeft,
		borderRadiusRight,
		noSort,
		height,
		defaultSortConfig,
		sortIndicatorColor = '#4a1830',
		selectedColor = '#a34e76',
		borderColor = 'transparent',
		textColor = '#fff',
		textActiveColor = '#fff',
		fontWeight = 'bold',
		screenWidth,
		textStyle,
		cellContainerStyle
	} = props;

	const { present, dismiss } = usePickerSheet();
	const filterSheetTimerRef = useRef(null);
	const onPressOpenColumnMenuRef = useRef(null);

	useEffect(() => {
		return () => {
			if (filterSheetTimerRef.current) {
				clearTimeout(filterSheetTimerRef.current);
			}
		};
	}, []);

	const SCREEN_WIDTH = screenWidth || Layout.window.width;

	const commonTextStyle = {
		fontWeight: fontWeight,
		maxHeight: height,
		color: textColor,
		...textStyle
	};

	const commonViewStyle = {
		padding: 10,
		height: height,
		justifyContent: 'center',
		alignItems: 'center'
	};

	const activeTextStyle = {
		...commonTextStyle,
		color: textActiveColor || textColor
	};

	const activeViewStyle = {
		...commonViewStyle,
		backgroundColor: selectedColor
	};

	const middleBorderStyle = {
		borderRightWidth: 0.5,
		borderStyle: 'solid',
		borderColor: borderColor
	};

	const leftBorderStyle = {
		borderLeftWidth: Platform.OS === 'ios' ? 0 : 0.5,
		borderRightStyle: Platform.OS === 'ios' ? 'none' : 'solid',
		borderTopLeftRadius: borderRadiusLeft,
		borderColor: Platform.OS === 'ios' ? undefined : borderColor
	};

	const rightBorderStyle = {
		borderRightWidth: Platform.OS === 'ios' ? 0 : 0.5,
		borderRightStyle: Platform.OS === 'ios' ? 'none' : 'solid',
		borderTopRightRadius: borderRadiusRight,
		borderColor: Platform.OS === 'ios' ? undefined : borderColor
	};

	/**
	 * Getter for text styles.
	 *
	 * @param  {boolean} active
	 * @param  {boolean} showBorder
	 * @param  {number}  width
	 * @param  {Text}  align
	 *
	 * @return {object} Object to apply to a `style` prop.
	 */
	function getTextStyle(active, showBorder, width, align) {
		const baseStyle = active ? activeTextStyle : commonTextStyle;

		return {
			width,
			flexDirection: 'row',
			backgroundColor: 'transparent',
			borderTopLeftRadius: borderRadiusLeft,
			borderTopRightRadius: borderRadiusRight,
			textAlign: align || 'center',
			...baseStyle
		};
	}

	/**
	 * Getter for view styles.
	 *
	 * @param  {boolean} active
	 * @param  {number}  width
	 * @param  {string} i
	 * @param  {number} length
	 *
	 * @return {object} Object to apply to a `style` prop.
	 */
	function getViewStyle(active, width, i, length) {
		const baseStyle = active ? activeViewStyle : commonViewStyle;
		const leftBorderStyleObj = i === 0 ? leftBorderStyle : undefined;
		const rightBorderStyleObj = i === length - 1 ? rightBorderStyle : undefined;
		const middleBorderStyleObj = i > 0 && i < length - 1 ? middleBorderStyle : undefined;

		return {
			...baseStyle,
			...leftBorderStyleObj,
			...rightBorderStyleObj,
			...middleBorderStyleObj,
			width,
			flexDirection: 'row',
			alignItems: 'center',
			...cellContainerStyle
		};
	}

	const sortKey = column.sortKey || column.key;
	const hasFilter = isColumnFilterActive(filterValue);
	const isColumnOptions = column.columnOptions;
	const filterOptionDropdown = column.columnOptions?.optionDropdown;
	const dropdownOptions = filterOptionDropdown ? filterOptions : [];

	const isSorted = (!noSort || isColumnOptions) && sortConfig.key === sortKey && Boolean(sortConfig.direction);
	const isDefaultColumnSort =
		defaultSortConfig &&
		sortConfig.key === sortKey &&
		sortConfig.key === defaultSortConfig.key &&
		sortConfig.direction === defaultSortConfig.direction;

	const menuValue = !isSorted || isDefaultColumnSort ? null : `sorting-${sortConfig.direction}`;

	const menuItems = [];
	if (column.columnOptions?.sort) {
		menuItems.push({
			label: 'Sort Ascending',
			value: 'sorting-asc',
			renderIcon: () => <FontAwesome name="chevron-up" size={12} color={sortIndicatorColor} />
		});
		menuItems.push({
			label: 'Sort Descending',
			value: 'sorting-desc',
			renderIcon: () => <FontAwesome name="chevron-down" size={12} color={sortIndicatorColor} />
		});
	}
	if (column.columnOptions?.filter) {
		menuItems.push({
			label: 'Show Filter',
			value: 'filtering',
			renderIcon: () => <FontAwesome name="filter" size={12} color={sortIndicatorColor} />
		});
	}
	if (menuItems.length > 0) {
		menuItems.push({
			label: 'Clear',
			value: 'clear',
			renderIcon: () => <FontAwesome name="times" size={12} color={sortIndicatorColor} />
		});
	}

	const openFilterSheet = useCallback(() => {
		const onChange = value => {
			onFilterChange(sortKey, value);
			dismiss();
		};

		const onClear = () => {
			onFilterChange(sortKey, filterOptionDropdown ? [] : '');
			dismiss();
		};

		present({
			title: `Filter by ${column.label}`,
			dynamicHeight: false,
			scrollable: false,
			sheetHeightFraction: filterOptionDropdown ? 0.35 : 0.3,
			accentColor: sortIndicatorColor,
			children: filterOptionDropdown ? (
				<ColumnFilterDropdownSheet
					options={dropdownOptions}
					filterValue={filterValue}
					onChange={onChange}
					onClear={onClear}
					indicatorColor={sortIndicatorColor}
				/>
			) : (
				<ColumnFilterInputSheet
					columnLabel={column.label}
					filterValue={filterValue}
					onChange={onChange}
					onClear={onClear}
					textColor={textColor}
					buttonBackgroundColor={sortIndicatorColor}
				/>
			)
		});
	}, [
		column.label,
		dismiss,
		dropdownOptions,
		filterOptionDropdown,
		filterValue,
		onFilterChange,
		present,
		sortIndicatorColor,
		sortKey,
		textColor
	]);

	const handleMenuSelect = value => {
		switch (value) {
			case 'sorting-asc':
				onSortChange({
					key: sortKey,
					direction: 'asc'
				});
				break;

			case 'sorting-desc':
				onSortChange({
					key: sortKey,
					direction: 'desc'
				});
				break;

			case 'filtering':
				if (filterSheetTimerRef.current) {
					clearTimeout(filterSheetTimerRef.current);
				}
				filterSheetTimerRef.current = setTimeout(openFilterSheet, FILTER_SHEET_OPEN_DELAY_MS);
				break;

			case 'clear':
				if (column.columnOptions?.filter) {
					onFilterChange(sortKey, filterOptionDropdown ? [] : '');
				}

				if (isSorted && defaultSortConfig) {
					onSortChange(defaultSortConfig);
				}

				dismiss();
				break;

			default:
				break;
		}
	};

	return (
		<View style={getViewStyle(isSorted, column.width * SCREEN_WIDTH, i, columnCount)} key={sortKey}>
			<TouchableOpacity
				style={styles.sortTouchable}
				onPress={() => {
					if (isColumnOptions) {
						onPressOpenColumnMenuRef.current?.();
						return;
					}
					!noSort &&
						onSortChange({
							key: sortKey,
							direction: !isSorted ? 'asc' : sortConfig.direction === 'asc' ? 'desc' : 'asc'
						});
				}}
			>
				{column.icon && (
					<FontAwesome key={sortKey} name={column.icon} size={20} color={textColor} style={{ marginLeft: 10 }} />
				)}

				{column.label ? (
					<Text
						style={[getTextStyle(isSorted, i < columnCount - 1, column.width * screenWidth * 0.8, column.align)]}
						key={sortKey + '1'}
					>
						{column.label}
						{isColumnOptions && (
							<View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
								<ColumnIndicators
									sortKey={sortKey}
									isSorted={isSorted}
									sortDirection={sortConfig.direction}
									hasFilter={hasFilter}
									showFilterIcon
									sortIndicatorColor={sortIndicatorColor}
								/>
							</View>
						)}
					</Text>
				) : null}

				{!isColumnOptions ? (
					<ColumnIndicators
						sortKey={sortKey}
						isSorted={isSorted}
						sortDirection={sortConfig.direction}
						hasFilter={hasFilter}
						sortIndicatorColor={sortIndicatorColor}
					/>
				) : null}
				{isColumnOptions && (
					<StyledSelect
						items={menuItems}
						value={menuValue}
						onValueChange={handleMenuSelect}
						onPressOpen={open => {
							onPressOpenColumnMenuRef.current = open;
						}}
						placeholder=""
						placeholderAsResetOption={false}
						noBorder
						width={0}
						height={0}
						fontSize={12}
						backgroundColor="transparent"
						color={textColor}
						placeholderColor={textColor}
						iconColor={sortIndicatorColor}
						paddingHorizontal={0}
						sheetHeightFraction={0.35}
						title={column.label}
						touchableStyle={styles.menuTouchable}
						anchorStyle={styles.menuAnchor}
						textStyle={styles.hiddenLabel}
					/>
				)}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	sortTouchable: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 2
	},
	columnOptionsTouchable: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 2
	},
	menuTouchable: {
		paddingHorizontal: 0,
		justifyContent: 'center'
	},
	menuAnchor: {
		justifyContent: 'center'
	},
	hiddenLabel: {
		width: 0,
		height: 0,
		opacity: 0,
		fontSize: 0
	},
	indicator: {
		marginLeft: 1,
		marginBottom: -2
	}
});

export default SortColumn;
