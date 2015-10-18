document.addEventListener('appload', function() {
	[].forEach.call(document.querySelectorAll('.widget'), function(element) {
		element.addEventListener('mousedown', function() {
			widgetSetActive(true, element);
		});
	});

	document.addEventListener('mousedown', function(event) {
		// is widget
		if (event.target.classList.contains('widget') || event.target.parents('.widget').length !== 0) {
			return;
		}

		// is resize controls
		if (event.target.classList.contains('resize')) {
			return;
		}

		// dispatch event
		widgetSetActive(false);
	});

	function widgetSetActive(setActive, widget) {
		var activeWidget = document.querySelector('.widget__active');
		if (activeWidget !== null) {
			activeWidget.dispatchEvent(new Event('widget__inactive'));
		}

		if (setActive) {
			widget.dispatchEvent(new Event('widget__active'));
		}
	}
});
