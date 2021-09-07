module.exports = (str, len) => {
	if (!str) return '';
	if (!len) len = 30;

	return _.truncate(str, { length: len })
}