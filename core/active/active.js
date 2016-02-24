define(['core/widget/widget', 'core/resize/resize', 'css!core/active/active.css'], function(widget, resize) {
	widget.getAll().forEach(function(element) {
		element.addEventListener('mousedown', function() {
			widget.setActive(element);
		});
	});

	document.addEventListener('mousedown', function(event) {
		// is widget
		if (widget.isValid(event.target)) {
			return;
		}

		// is resize controls
		if (resize.isValid(event.target)) {
			return;
		}

		// dispatch event
		widget.removeActive();
	});
});
