export function formatDate(timestamp, options = {}) {
	if (!timestamp) return '';

	const date = new Date(timestamp);

	const defaultOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};

	const formatter = new Intl.DateTimeFormat(undefined, { ...defaultOptions, ...options });
	return formatter.format(date);
}