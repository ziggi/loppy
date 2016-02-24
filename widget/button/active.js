define(['core/widget/widget', 'core/active/active'], function(widget, active) {
	widget.getAll('button').forEach(function(element) {
		element.addEventListener('widgetInactive', function() {
			this.classList.remove('widget__active');
		});

		element.addEventListener('widgetActive', function() {
			this.classList.add('widget__active');
		});
	});
});
