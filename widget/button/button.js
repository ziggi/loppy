define(function(require) {
	// load modules
	var widget = require('core/widget/widget');
	var globals = require('core/globals');
	var move = require('core/move/move');
	var active = require('core/active/active');
	var resize = require('core/resize/resize');
	var guide = require('core/guide/guide');
	var toolbar = require('core/toolbar/toolbar');
	var editbar = require('core/editbar/editbar');
	var buttonEditbar = require('widget/button/editbar/editbar');
	require('css!widget/button/button.css');

	// resize params
	var resizeParams = {
		minWidth: 70,
		minHeight: 30,
		fontSizeRatio: 0.4,
		type: 'all'
	};

	widget.on('add', function(w) {
		if (w.type !== 'button') {
			return;
		}

		move.enable(w);
		resize.enable(w, resizeParams);
		active.enable(w);
		guide.enable(w);
		editbar.enable(w, { edit: () => buttonEditbar.show(w) });

		active.on(w, 'set', function() {
			w.element.classList.add('widget__active');
		});

		active.on(w, 'remove', function() {
			w.element.classList.remove('widget__active');
		});
	});

	widget.on('remove', function(w) {
		if (w.type !== 'button') {
			return;
		}

		move.disable(w);
		resize.disable(w);
		active.disable(w);
		guide.disable(w);
		editbar.disable(w);

		w.element.parentNode.removeChild(w.element);
	});

	toolbar.on('add', function(type) {
		if (type !== 'button') {
			return;
		}

		require(['text!widget/button/button.html'], function(html) {
			var blockElement = document.querySelector('.block__item');
			blockElement.insertAdjacentHTML('beforeend', html);

			var w = {
				element: blockElement.querySelector('.widget:last-child'),
				type: 'button'
			};

			widget.add(w);

			toolbar.close();
			resize.resize(w, {
				top: blockElement.offsetHeight / 2,
				left: blockElement.offsetWidth / 2,
				width: resizeParams.minWidth,
				height: resizeParams.minHeight
			}, resizeParams);
			active.set(w);
		});
	});
});
