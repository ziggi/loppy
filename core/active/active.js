define(function(require) {
	// load modules
	var widget = require('core/widget/widget');
	var control = require('core/control/control');
	var module = require('core/module');
	require('css!core/active/active.css');

	// create module
	var active = module('Active');

	//
	widget.on('add', function(w) {
		w.element.addEventListener('mousedown', function(event) {
			var isNotLeftClick = event.which !== 1;
			if (isNotLeftClick) {
				return;
			}

			if (!active.isEnabled(w)) {
				return;
			}

			if (active.isValid(w)) {
				return;
			}

			active.set(w);
		});
	});

	document.addEventListener('mousedown', function(event) {
		if (control.isValid(event.target)) {
			return;
		}

		if (widget.isValid(event.target)) {
			return;
		}

		active.remove();
	});

	return active;
});
