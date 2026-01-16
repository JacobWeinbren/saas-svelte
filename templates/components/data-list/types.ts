export interface DataListContext {
	current: {
		root: () => string;
		item: () => string;
		label: () => string;
		value: () => string;
	};
}
