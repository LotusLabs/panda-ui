export function isColumnFilterActive(filterValue) {
	if (Array.isArray(filterValue)) {
		return filterValue.length > 0;
	}

	return String(filterValue ?? '').trim().length > 0;
}

export function filterTableData(data, filterConfig = {}) {
	if (!Object.keys(filterConfig).length) {
		return data;
	}

	return data.filter(item => {
		for (const key in filterConfig) {
			const filterValue = filterConfig[key];
			const itemValue = item[key];

			if (itemValue == null) {
				return false;
			}

			if (Array.isArray(filterValue)) {
				if (!filterValue.some(value => String(value) === String(itemValue))) {
					return false;
				}
			} else {
				const filter = String(filterValue).trim().toLowerCase();

				if (!String(itemValue).toLowerCase().includes(filter)) {
					return false;
				}
			}
		}

		return true;
	});
};
