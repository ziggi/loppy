define(function(require) {
	// load modules
	var widget = require('core/widget/widget');
	var module = require('core/module');
	var globals = require('core/globals');
	var loader = require('core/loader');
	var scroll = require('helper/scrollpos');
	require('css!core/editbar/editbar.css');
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
	var editbarLoader = loader('core/editbar/editbar.html');

	editbarLoader.onload = function(text) {
		globals.get('controlElement').insertAdjacentHTML('beforeend', text);

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
	}

	editbarLoader.send();

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
	document.addEventListener('widgetAdd', function(event) {
		var w = event.detail.widget;

		w.element.addEventListener('widgetActiveSet', function(event) {
			if (!editbar.isEnabled(w)) {
				return;
			}

			editbar.set(w);
			editbar.show();
			editbar.setPos(this);
		});

		w.element.addEventListener('widgetActiveRemove', function() {
			editbar.hide();
			editbar.remove(w);
		});

		w.element.addEventListener('widgetMoveProcess', function() {
			editbar.setPos(this);
		});

		w.element.addEventListener('widgetResizeProcess', function() {
			editbar.setPos(this);
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
