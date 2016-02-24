define(['core/widget/widget', 'core/move/move', 'core/move/move_action'], function(widget, move) {
	widget.getAll('button').forEach(function(element) {
		element.addEventListener('widgetMoveStop', function() {
			this.classList.remove('widget__move');
			this.querySelector('.widget__item').classList.remove('widget__move');
		});

		element.addEventListener('widgetMoveStart', function() {
			this.classList.add('widget__move');
			this.querySelector('.widget__item').classList.add('widget__move');
		});
	});
});
