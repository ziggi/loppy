document.addEventListener('appload', function() {
	[].forEach.call(document.querySelectorAll('.widget'), function(element) {
		element.addEventListener('mousedown', function() {
			element.dispatchEvent(new Event('widget__active'));
		});
	});

	document.addEventListener('mousedown', function(event) {
		// is widget
		if (event.target.classList.contains('widget') || event.target.parents('.widget').length !== 0) {
			return;
		}

		// dispatch event
		var widget = document.querySelector('.widget__active');
		if (widget !== null) {
			widget.dispatchEvent(new Event('widget__inactive'));
		}
	});
});
