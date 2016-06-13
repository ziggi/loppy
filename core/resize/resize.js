define(function(require) {
	// load modules
	var widget = require('core/widget/widget');
	var module = require('core/module');
	var globals = require('core/globals');
	var resizeControl = require('core/resize/resize_control');
	var active = require('core/active/active');
	require('css!core/resize/resize.css');

	//
	var resize = module('Resize');

	resize.resize = function(w, params, resizeParams) {
		// resize inner element
		var resizeElement = w.element.querySelector('.widget__inner').firstChild.nextSibling;

		for (var key in params) {
			if (!params.hasOwnProperty(key)) {
				continue;
			}

			if (params[key] === undefined) {
				continue;
			}

			resizeElement.style[key] = params[key] + 'px';
			w.element.style[key] = params[key] + 'px';
		}

		if (resizeParams.fontSizeRatio !== undefined) {
			var fontRatio = resizeParams.fontSizeRatio;
			var height = params.height;
			var width = params.width;

			if (height === undefined) {
				height = parseInt(w.element.style.height);
			}

			if (width === undefined) {
				width = parseInt(w.element.style.width);
			}

			resizeElement.style.fontSize = Math.min(width * fontRatio / 2,
			                                        height * fontRatio) + 'px';
		}
	}

	//
	widget.on('add', function(w) {
		active.on(w, 'set', function() {
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

		active.on(w, 'remove', function() {
			resizeControl.getElements(w.element).forEach(function(resizeElement) {
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

		var currentHeight = parseInt(w.element.style.height);
		var currentWidth = parseInt(w.element.style.width);

		var maxOffsetTop = document.body.clientHeight;
		var maxOffsetLeft = document.body.clientWidth;
		var newTop, newLeft, newHeight, newWidth;

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
			top: newTop,
			left: newLeft,
			height: newHeight,
			width: newWidth
		};

		resize.resize(w, params, resizeParams);
		resize.process(w);
	});

	document.addEventListener('mouseup', function(event) {
		if (resize.get() === null) {
			return;
		}

		resizeControl.remove();
	});

	return resize;
});
