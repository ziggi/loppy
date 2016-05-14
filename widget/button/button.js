define(function(require) {
	// load modules
	var widget = require('core/widget/widget');
	var loader = require('core/loader');
	var globals = require('core/globals');
	var move = require('core/move/move');
	var active = require('core/active/active');
	var resize = require('core/resize/resize');
	var guide = require('core/guide/guide');
	var toolbar = require('core/toolbar/toolbar');
	require('css!widget/button/button.css');

	// resize params
	var resizeParams = {
		minWidth: 70,
		minHeight: 30,
		fontSizeRatio: 0.4,
		type: 'all'
	};

	document.addEventListener('widgetAdd', function(event) {
		var w = event.detail.widget;

		if (w.type !== 'button') {
			return;
		}

		move.enable(w);
		resize.enable(w, resizeParams);
		active.enable(w);
		guide.enable(w);

		w.element.addEventListener('widgetActiveRemove', function() {
			this.classList.remove('widget__active');
		});

		w.element.addEventListener('widgetActiveSet', function() {
			this.classList.add('widget__active');
		});
	});

	document.addEventListener('clickWidgetAdd', function(event) {
		var type = event.detail.type;

		if (type !== 'button') {
			return;
		}

		var element = loader('widget/button/button.html');

		element.onload = function(text) {
			globals.get('blockElement').insertAdjacentHTML('beforeend', text);
			var elem = globals.get('blockElement').lastElementChild.querySelector('.widget');

			var w = {
				element: globals.get('blockElement').lastElementChild.querySelector('.widget'),
				type: 'button'
			};

			// add widget
			widget.add(w);

			// enable widget stuff
			move.enable(w);
			resize.enable(w, resizeParams);
			active.enable(w);
			guide.enable(w);

			// set size
			var params = {
				top: '50%',
				left: '50%',
				width: resizeParams.minWidth + 'px',
				height: resizeParams.minHeight + 'px'
			}
			resize.resize(w, params, resizeParams);

			// set active
			active.set(w);

			// toggle toolbar
			toolbar.close();
		}

		element.send();
	});
});
