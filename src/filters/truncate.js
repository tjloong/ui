import truncate from 'lodash/truncate'

export default (str, len) => {
	if (!str) return '';
	if (!len) len = 30;

	return truncate(str, { length: len })
}