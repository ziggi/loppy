define(['core/widget/widget',
        'core/move/move',
        'core/move/move_action',
        'core/active/active',
        'core/active/active_action',
        'css!widget/button/button.css',
        'core/resize/resize',
        'core/resize/resize_action',
        'core/resize/resize_control'
	], function(widget, move, _, active, _, _, resize, _, _) {

	var buttonWidgets = widget.find({type: 'button'});

	move.enable(buttonWidgets);
	resize.enable(buttonWidgets, {minWidth: 70, minHeight: 30, fontSizeRation: 0.4, type: 'all'});
	active.enable(buttonWidgets);

	widget.getAllElements('button').forEach(function(element) {
		element.addEventListener('widgetActiveRemove', function() {
			this.classList.remove('widget__active');
		});

		element.addEventListener('widgetActiveSet', function() {
			this.classList.add('widget__active');
		});
	});
});
