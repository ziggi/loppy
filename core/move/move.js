define(function(require) {
	// load modules
	var widget = require('core/widget/widget');
	var module = require('core/module');
	var globals = require('core/globals');
	var resizeControl = require('core/resize/resize_control');
	require('css!core/move/move.css');

	//
	globals.setDefault('offsetTop', 0);
	globals.setDefault('offsetBottom', 0);
	globals.setDefault('offsetLeft', 0);
	globals.setDefault('offsetRight', 0);

	//
	var move = module('Move');

	var cursorOffsetLeft = 0;
	var cursorOffsetTop = 0;

	document.addEventListener('widgetAdd', function(event) {
		var w = event.detail.widget;

		w.element.addEventListener('mousedown', function(event) {
			var isNotLeftClick = event.which !== 1;
			if (isNotLeftClick) {
				return;
			}

			if (!move.isEnabled(w)) {
				return;
			}

			if (resizeControl.isValid(event.target)) {
				return;
			}

			cursorOffsetLeft = event.pageX - w.element.offsetLeft;
			cursorOffsetTop = event.pageY - w.element.offsetTop;

			move.set(w);
		});
	});

	document.addEventListener('mouseup', function() {
		if (move.get() === null) {
			return;
		}

		move.remove();
	});

	document.addEventListener('mousemove', function(event) {
		var w = move.get();
		if (w === null) {
			return;
		}

		// vars
		var maxOffsetTop = document.body.clientHeight;
		var maxOffsetLeft = document.body.clientWidth;

		var newLeft = event.pageX - cursorOffsetLeft;
		var newTop = event.pageY - cursorOffsetTop;

		var resizeOffset = resizeControl.getOffset(w);

		// check on borders
		var minLeft = globals.get('offsetLeft') + resizeOffset;
		var maxLeft = -globals.get('offsetRight') + maxOffsetLeft - w.element.offsetWidth - resizeOffset;

		if (newLeft < minLeft) {
			newLeft = minLeft;
		} else if (newLeft > maxLeft) {
			newLeft = maxLeft;
		}

		var minTop = globals.get('offsetTop') + resizeOffset;
		var maxTop = -globals.get('offsetBottom') + maxOffsetTop - w.element.offsetHeight - resizeOffset;

		if (newTop < minTop) {
			newTop = minTop;
		} else if (newTop > maxTop) {
			newTop = maxTop;
		}

		// update position
		w.element.style.left = newLeft + 'px';
		w.element.style.top = newTop + 'px';

		// call event
		move.process(w);
	});

	return move;
});
