define(['core/widget/widget', 'core/active/active', 'core/resize/resize'], function(widget, active, resize) {
	widget.getAllElements().forEach(function(element) {
		element.addEventListener('mousedown', function(event) {
			var isNotLeftClick = event.which !== 1;
			if (isNotLeftClick) {
				return;
			}

			var w = widget.find({element: element})[0];

			if (!active.isEnabled(w)) {
				return;
			}

			active.set(w);
		});
	});

	document.addEventListener('mousedown', function(event) {
		if (widget.isValid(event.target)) {
			return;
		}

		if (resize.isValid(event.target)) {
			return;
		}

		active.remove();
	});
});
