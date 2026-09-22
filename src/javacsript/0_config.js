Config.passages.onProcess = function (p) {
	return p.text.replace(/[\t\n]+/g, '');
};