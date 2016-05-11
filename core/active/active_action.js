define(['core/widget/widget', 'core/active/active'], function(widget, active) {
	widget.getAll().forEach(function(w) {
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
		if (widget.isValid(event.target)) {
			return;
		}

		active.remove();
	});
});
