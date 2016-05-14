define(function(require) {
	// load modules
	var widget = require('core/widget/widget');
	var module = require('core/module');
	var globals = require('core/globals');
	var resizeControl = require('core/resize/resize_control');
	require('css!core/resize/resize.css');

	//
	var resize = module('Resize');

	resize.resize = function(w, params, resizeParams) {
		// resize inner element
		var resizeElement = w.element.querySelector('.widget__inner').firstChild.nextSibling;
		resizeElement.style.top = params.top;
		resizeElement.style.left = params.left;
		resizeElement.style.height = params.height;
		resizeElement.style.width = params.width;
		resizeElement.style.fontSize = Math.min(parseInt(params.width) * resizeParams.fontSizeRatio / 2,
			                                    parseInt(params.height) * resizeParams.fontSizeRatio) + 'px';

		// resize borders
		w.element.style.top = params.top;
		w.element.style.left = params.left;
		w.element.style.height = params.height;
		w.element.style.width = params.width;
	}

	//
	document.addEventListener('widgetAdd', function(event) {
		var w = event.detail.widget;

		w.element.addEventListener('widgetActiveSet', function(event) {
			if (!resize.isEnabled(w)) {
				return;
			}

			var type = resize.getParams(w).type;
			resize.set(w, type);

			resizeControl.getNames(type).forEach(function(name) {
				w.element.insertAdjacentHTML('beforeend', '<div class="resize resize-' + name + '"></div>');
			});

			resizeControl.getElements(w.element).forEach(function(resizeElement) {
				resizeElement.addEventListener('mousedown', function(event) {
					var isNotLeftClick = event.which !== 1;
					if (isNotLeftClick) {
						return;
					}

					resizeControl.set(resizeElement);
				});
			});
		});

		w.element.addEventListener('widgetActiveRemove', function() {
			resizeControl.getElements(this).forEach(function(resizeElement) {
				resizeElement.remove();
			});

			resize.remove(w);
		});
	});

	document.addEventListener('mousemove', function(event) {
		var w = resize.get();
		if (w === null || resizeControl.get() === null) {
			return;
		}

		var resizeOffset = resizeControl.getOffset();
		var resizeParams = resize.getParams(w);

		var currentStyle = window.getComputedStyle(w.element, null);
		var currentHeight = parseInt(currentStyle.getPropertyValue('height'));
		var currentWidth = parseInt(currentStyle.getPropertyValue('width'));

		var maxOffsetTop = document.documentElement.clientHeight;
		var maxOffsetLeft = document.documentElement.clientWidth;
		var newTop, newLeft, newHeight = currentHeight, newWidth = currentWidth;

		var controlType = resizeControl.getElementType(resizeControl.get());

		var isVerticalTop = ['n', 'nw', 'ne'].some(c => c == controlType);
		var isVerticalBottom = ['s', 'sw', 'se'].some(c => c == controlType);
		var isHorizontalLeft = ['w', 'sw', 'nw'].some(c => c == controlType);
		var isHorizontalRight = ['e', 'se', 'ne'].some(c => c == controlType);

		if (isVerticalTop) {
			newHeight = w.element.offsetTop - event.pageY + currentHeight;

			var maxHeight = w.element.offsetTop + currentHeight
			                - resizeOffset
			                - globals.get('offsetTop');

			if (newHeight > maxHeight) {
				newTop = event.pageY + (newHeight - maxHeight);
				newHeight = maxHeight;
			} else {
				if (newHeight > resizeParams.minHeight) {
					newTop = event.pageY;
				} else {
					newTop = w.element.offsetTop + currentHeight - resizeParams.minHeight;
					newHeight = resizeParams.minHeight;
				}
			}
		}

		if (isVerticalBottom) {
			newHeight = event.pageY - w.element.offsetTop;

			var maxHeight = maxOffsetTop - w.element.offsetTop
			                + currentHeight - w.element.offsetHeight
			                - resizeOffset
			                - globals.get('offsetBottom');

			if (newHeight > maxHeight) {
				newHeight = maxHeight;
			} else {
				if (newHeight < resizeParams.minHeight) {
					newHeight = resizeParams.minHeight;
				}
			}
		}

		if (isHorizontalLeft) {
			newWidth = w.element.offsetLeft - event.pageX + currentWidth;

			var maxWidth = w.element.offsetLeft + currentWidth
			               - resizeOffset
			               - globals.get('offsetLeft');

			if (newWidth > maxWidth) {
				newLeft = event.pageX + (newWidth - maxWidth);
				newWidth = maxWidth;
			} else {
				if (newWidth > resizeParams.minWidth) {
					newLeft = event.pageX;
				} else {
					newLeft = w.element.offsetLeft + currentWidth - resizeParams.minWidth;
					newWidth = resizeParams.minWidth;
				}
			}
		}

		if (isHorizontalRight) {
			newWidth = event.pageX - w.element.offsetLeft;

			var maxWidth = maxOffsetLeft - w.element.offsetLeft
			               + currentWidth - w.element.offsetWidth
			               - resizeOffset
			               - globals.get('offsetRight');

			if (newWidth < resizeParams.minWidth) {
				newWidth = resizeParams.minWidth;
			} else if (newWidth > maxWidth) {
				newWidth = maxWidth;
			}
		}

		// resize
		var params = {
			top: newTop + 'px',
			left: newLeft + 'px',
			height: newHeight + 'px',
			width: newWidth + 'px'
		};

		resize.resize(w, params, resizeParams);
	});

	document.addEventListener('mouseup', function(event) {
		if (resize.get() === null) {
			return;
		}

		resizeControl.remove();
	});

	return resize;
});
