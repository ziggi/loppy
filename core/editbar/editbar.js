define(function(require) {
	// load modules
	var widget = require('core/widget/widget');
	var module = require('core/module');
	var globals = require('core/globals');
	var scroll = require('helper/scrollpos');
	require('css!core/editbar/editbar.css');
	var active = require('core/active/active');
	var move = require('core/move/move');
	var resize = require('core/resize/resize');
	var action = {
		arrangedown: require('core/editbar/action/arrangedown'),
		arrangeup: require('core/editbar/action/arrangeup'),
		delete: require('core/editbar/action/delete'),
		duplicate: require('core/editbar/action/duplicate'),
		edit: require('core/editbar/action/edit')
	};

	//
	var editbar = module('Editbar');
	var editbarElement = null;
	var editbarItems = [];
	var resizeOffset = require('core/resize/resize_control').getOffset();

	// load and insert html
	require(['text!core/editbar/editbar.html'], function(html) {
		globals.get('controlElement').insertAdjacentHTML('beforeend', html);

		editbarElement = document.querySelector('.control__editbar');
		editbarItems = Array.from(document.querySelectorAll('.editbar__item'));

		editbarItems.forEach(function(item) {
			item.addEventListener('mousedown', function() {
				var type = this.dataset.type;
				var w = editbar.get();
				var params = editbar.getParams(w);
				var handler = params && params[type];

				if (handler !== undefined) {
					handler(w, editbar);
				} else {
					if (action[type] !== undefined) {
						action[type].run(w, editbar);
					}
				}
			});
		});
	});

	// editbar functions
	editbar.setPos = function(widgetElement) {
		var offsetTop = globals.get('offsetTop');
		var offsetRight = globals.get('offsetRight');

		// top pos
		var newTop = widgetElement.offsetTop - editbarElement.offsetHeight - resizeOffset;

		if (newTop <= offsetTop + scroll.getTop()) {
			newTop = widgetElement.offsetTop + widgetElement.offsetHeight + resizeOffset;
		}

		// left pos
		var newLeft = widgetElement.offsetLeft;
		var maxLeft = document.documentElement.clientWidth - editbarElement.offsetWidth - offsetRight;

		if (newLeft > maxLeft) {
			newLeft = maxLeft;
		}

		editbarElement.style.top = newTop + 'px';
		editbarElement.style.left = newLeft + 'px';
	}

	editbar.show = function() {
		editbarElement.style.display = 'block';
	}

	editbar.hide = function() {
		editbarElement.style.display = 'none';
	}

	//
	widget.on('add', function(w) {
		active.on(w, 'set', function() {
			if (!editbar.isEnabled(w)) {
				return;
			}

			editbar.set(w);
			editbar.show();
			editbar.setPos(w.element);
		});

		active.on(w, 'remove', function() {
			editbar.hide();
			editbar.remove(w);
		});

		move.on(w, 'process', function() {
			editbar.setPos(w.element);
		});

		resize.on(w, 'process', function() {
			editbar.setPos(w.element);
		});
	});

	window.addEventListener('scroll', function() {
		if (editbar.get() === null) {
			return;
		}

		var w = require('core/active/active').get();
		editbar.setPos(w.element);
	});

	return editbar;
});
