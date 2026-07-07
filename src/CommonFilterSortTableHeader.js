import React, { useEffect, useMemo } from 'react';
import { firstBy } from 'thenby';
import Layout from './constants/Layout';
import SortHeader from './SortHeader';
import { filterTableData, isColumnFilterActive } from './utils/tableFilterUtils';

const CommonFilterSortTableHeader = ({
	columns,
	sortConfig,
	onSortChange,
	filterConfig,
	onFilterChange,
	filterOptions,
	tableWidth,
	noSort,
	defaultSortConfig,
	tableData,
	setTableSortFilterData,
	textColor,
	selectedColor,
	indicatorColor,
	textActiveColor
}) => {
	const width = tableWidth || Layout.window.tableWidth;

	useEffect(() => {
		if (!setTableSortFilterData || !sortConfig) {
			return;
		}

		const sortedData = [...tableData].sort(
			firstBy(sortConfig.key, {
				ignoreCase: true,
				direction: sortConfig.direction
			})
		);

		setTableSortFilterData(filterTableData(sortedData, filterConfig));
	}, [tableData, sortConfig, filterConfig, setTableSortFilterData]);

	const handleFilterChange = (columnKey, value) => {
		if (!onFilterChange) {
			return;
		}

		const updated = { ...(filterConfig || {}) };

		const isActiveFilter = isColumnFilterActive(value);

		if (!isActiveFilter) {
			delete updated[columnKey];
		} else if (Array.isArray(value)) {
			updated[columnKey] = value;
		} else {
			updated[columnKey] = String(value).trim();
		}

		onFilterChange(updated);
	};

	return (
		<SortHeader
			columns={columns}
			sortConfig={sortConfig}
			onSortChange={onSortChange}
			filterConfig={filterConfig}
			onFilterChange={handleFilterChange}
			filterOptions={filterOptions}
			sortIndicatorColor={indicatorColor}
			selectedColor={selectedColor}
			textColor={textColor}
			textActiveColor={textActiveColor}
			screenWidth={width}
			fontWeight={'500'}
			textStyle={{ fontSize: 12 }}
			headerContainerStyle={{
				borderWidth: 0,
				height: 44,
				justifyContent: 'center'
			}}
			cellContainerStyle={{ padding: 0 }}
			noSort={noSort}
			defaultSortConfig={defaultSortConfig}
		/>
	);
};
export default CommonFilterSortTableHeader;
