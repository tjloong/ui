module.exports = (value, option, utcToLocal = false) => {
	const date = utcToLocal ? moment.utc(value, 'YYYY-MM-DD HH:mm:ss').local() : moment(value, 'YYYY-MM-DD HH:mm:ss')
	const format = {
		time: 'h:mm A',
		date: 'DD MMM, YYYY',
		datetime: 'DD MMM, YYYY - h:mm A',
	}

	if (date.isValid()) {
		if (option && option.format) return date.format(option.format)
		else if (option == 'fromNow') return date.fromNow()
		else if (option == 'datetime') return date.format(format.datetime)
		else if (option == 'time') return date.format(format.time)

		else return date.format(format.date)
	}

	return value
}
