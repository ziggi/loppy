define(['core/widget/widget', 'core/resize/resize', 'core/resize/resize_control'], function(widget, resize, resizeControl) {
	widget.getAll().forEach(function(w) {
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

			var maxHeight = w.element.offsetTop + currentHeight - resizeOffset;

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

			var maxHeight = maxOffsetTop - w.element.offsetTop + currentHeight - w.element.offsetHeight - resizeOffset;

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

			var maxWidth = w.element.offsetLeft + currentWidth - resizeOffset;

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

			var maxWidth = maxOffsetLeft - w.element.offsetLeft + currentWidth - w.element.offsetWidth - resizeOffset;

			if (newWidth < resizeParams.minWidth) {
				newWidth = resizeParams.minWidth;
			} else if (newWidth > maxWidth) {
				newWidth = maxWidth;
			}
		}

		// resize inner element
		var resizeElement = w.element.querySelector('.widget__inner').firstChild.nextSibling;
		resizeElement.style.top = newTop + 'px';
		resizeElement.style.left = newLeft + 'px';
		resizeElement.style.height = newHeight + 'px';
		resizeElement.style.width = newWidth + 'px';
		resizeElement.style.fontSize = Math.min(newWidth * resizeParams.fontSizeRation / 2, newHeight * resizeParams.fontSizeRation) + 'px';

		// resize borders
		w.element.style.top = newTop + 'px';
		w.element.style.left = newLeft + 'px';
		w.element.style.height = newHeight + 'px';
		w.element.style.width = newWidth + 'px';
	});

	document.addEventListener('mouseup', function(event) {
		if (resize.get() === null) {
			return;
		}

		resizeControl.remove();
	});
});
