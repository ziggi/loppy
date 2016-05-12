define(function(require) {
	// load modules
	var widget = require('core/widget/widget');
	var move = require('core/move/move');
	require('core/move/move_action');
	var active = require('core/active/active');
	require('core/active/active_action');
	require('css!widget/button/button.css');
	var resize = require('core/resize/resize');
	require('core/resize/resize_action');
	require('core/resize/resize_control');
	var guide = require('core/guide/guide');
	require('core/guide/guide_action');

	// button
	var buttonWidgets = widget.find({type: 'button'});

	move.enable(buttonWidgets);
	resize.enable(buttonWidgets, {minWidth: 70, minHeight: 30, fontSizeRation: 0.4, type: 'all'});
	active.enable(buttonWidgets);
	guide.enable(buttonWidgets);

	widget.getAllElements('button').forEach(function(element) {
		element.addEventListener('widgetActiveRemove', function() {
			this.classList.remove('widget__active');
		});

		element.addEventListener('widgetActiveSet', function() {
			this.classList.add('widget__active');
		});
	});
});
