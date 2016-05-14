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
	require('css!widget/headline/headline.css');

	// resize params
	var resizeParams = {
		minWidth: 100,
		minHeight: 50,
		fontSizeRatio: 1.0,
		type: 'side'
	};

	document.addEventListener('widgetAdd', function(event) {
		var w = event.detail.widget;

		if (w.type !== 'headline') {
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

		if (type !== 'headline') {
			return;
		}

		var element = loader('widget/headline/headline.html');

		element.onload = function(text) {
			globals.get('blockElement').insertAdjacentHTML('beforeend', text);

			var w = {
				element: globals.get('blockElement').lastElementChild.querySelector('.widget'),
				type: 'headline'
			};

			widget.add(w);

			active.set(w);
			toolbar.close();
			resize.resize(w, {
				top: '50%',
				left: '50%',
				width: resizeParams.minWidth + 'px',
				height: resizeParams.minHeight + 'px'
			}, resizeParams);
		}

		element.send();
	});
});
