define(['core/widget/widget', 'core/resize/resize', 'css!widget/button/button.css'], function(widget, resize) {
	const BUTTON_WIDTH_MIN = 70;
	const BUTTON_HEIGHT_MIN = 30;
	const FONT_SIZE_RATIO = 0.4;

	var currentElement = null;
	var currentResizeElement = null;

	widget.getAll('button').forEach(function(element) {
		element.addEventListener('widgetActive', function() {
			resize.set(widget.get(element), 'all');

			resize.getControls(element).forEach(function(resizeElement) {
				resizeElement.addEventListener('mousedown', function() {
					currentElement = element;
					currentResizeElement = resizeElement;
				});
			});
		});

		element.addEventListener('widgetInactive', function() {
			resize.remove(widget.get(element));
		});
	});

	document.addEventListener('mousemove', function(event) {
		if (currentElement === null || currentResizeElement === null) {
			return;
		}

		var resizeOffset = resize.getOffset();

		var currentStyle = window.getComputedStyle(currentElement, null);
		var currentHeight = parseInt(currentStyle.getPropertyValue('height'));
		var currentWidth = parseInt(currentStyle.getPropertyValue('width'));

		var maxOffsetTop = document.documentElement.clientHeight;
		var maxOffsetLeft = document.documentElement.clientWidth;
		var newTop, newLeft, newHeight = currentHeight, newWidth = currentWidth;

		var controlType = resize.getControlType(currentResizeElement);

		var isVerticalTop = ['n', 'nw', 'ne'].some(c => c == controlType);
		var isVerticalBottom = ['s', 'sw', 'se'].some(c => c == controlType);
		var isHorizontalLeft = ['w', 'sw', 'nw'].some(c => c == controlType);
		var isHorizontalRight = ['e', 'se', 'ne'].some(c => c == controlType);

		if (isVerticalTop) {
			newHeight = currentElement.offsetTop - event.pageY + currentHeight;

			var maxHeight = currentElement.offsetTop + currentHeight - resizeOffset;

			if (newHeight > maxHeight) {
				newTop = event.pageY + (newHeight - maxHeight);
				newHeight = maxHeight;
			} else {
				if (newHeight > BUTTON_HEIGHT_MIN) {
					newTop = event.pageY;
				} else {
					newTop = currentElement.offsetTop + currentHeight - BUTTON_HEIGHT_MIN;
					newHeight = BUTTON_HEIGHT_MIN;
				}
			}
		}

		if (isVerticalBottom) {
			newHeight = event.pageY - currentElement.offsetTop;

			var maxHeight = maxOffsetTop - currentElement.offsetTop + currentHeight - currentElement.offsetHeight - resizeOffset;

			if (newHeight > maxHeight) {
				newHeight = maxHeight;
			} else {
				if (newHeight < BUTTON_HEIGHT_MIN) {
					newHeight = BUTTON_HEIGHT_MIN;
				}
			}
		}

		if (isHorizontalLeft) {
			newWidth = currentElement.offsetLeft - event.pageX + currentWidth;

			var maxWidth = currentElement.offsetLeft + currentWidth - resizeOffset;

			if (newWidth > maxWidth) {
				newLeft = event.pageX + (newWidth - maxWidth);
				newWidth = maxWidth;
			} else {
				if (newWidth > BUTTON_WIDTH_MIN) {
					newLeft = event.pageX;
				} else {
					newLeft = currentElement.offsetLeft + currentWidth - BUTTON_WIDTH_MIN;
					newWidth = BUTTON_WIDTH_MIN;
				}
			}
		}

		if (isHorizontalRight) {
			newWidth = event.pageX - currentElement.offsetLeft;

			var maxWidth = maxOffsetLeft - currentElement.offsetLeft + currentWidth - currentElement.offsetWidth - resizeOffset;

			if (newWidth < BUTTON_WIDTH_MIN) {
				newWidth = BUTTON_WIDTH_MIN;
			} else if (newWidth > maxWidth) {
				newWidth = maxWidth;
			}
		}

		currentElement.querySelector('.button').style.top = newTop + 'px';
		currentElement.querySelector('.button').style.left = newLeft + 'px';
		currentElement.querySelector('.button').style.height = newHeight + 'px';
		currentElement.querySelector('.button').style.width = newWidth + 'px';
		currentElement.querySelector('.button').style.fontSize = Math.min(newWidth * FONT_SIZE_RATIO / 2, newHeight * FONT_SIZE_RATIO) + 'px';

		currentElement.style.top = newTop + 'px';
		currentElement.style.left = newLeft + 'px';
		currentElement.style.height = newHeight + 'px';
		currentElement.style.width = newWidth + 'px';
	});

	document.addEventListener('mouseup', function(event) {
		currentElement = null;
		currentResizeElement = null;
	});
});
