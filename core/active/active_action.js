define(['core/widget/widget', 'core/active/active', 'core/resize/resize'], function(widget, active, resize) {
	widget.getAll().forEach(function(element) {
		element.addEventListener('mousedown', function(event) {
			var isNotLeftClick = event.which !== 1;
			if (isNotLeftClick) {
				return;
			}

			active.set(widget.get(element));
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
		active.remove();
	});
});
