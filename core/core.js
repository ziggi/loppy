define(function(require, exports, module) {
	// load modules
	var widget = require('core/widget/widget');
	require('css!core/core.css');

	// load widgets
	require('widget/button/button');
	require('widget/headline/headline');

	// add existing widgets
	var widgets = Array.from(document.querySelectorAll('.widget'));

	var index = 0;
	widgets.forEach(function(w) {
		Array.from(w.classList).forEach(function(c) {
			var matches = c.match(/^widget__([a-z-]+)$/);

			if (matches !== null) {
				widget.add({element: w, type: matches[1], i: index++});
			}
		});
	});
});
