document.addEventListener('appload', function() {
	const BUTTON_WIDTH_MIN = 70;
	const BUTTON_HEIGHT_MIN = 30;
	const FONT_SIZE_RATIO = 0.4;

	var currentElement = null;
	var currentResize = null;

	[].forEach.call(document.querySelectorAll('.widget'), function(element) {
		element.addEventListener('widget__active', function() {
			this.widget().resize('init', 'all');

			[].forEach.call(document.querySelectorAll('.resize'), function(resize) {
				resize.addEventListener('mousedown', function() {
					currentElement = element;
					currentResize = resize;
				});
			});
		});
	});

	document.addEventListener('mousemove', function(event) {
		if (currentElement === null || currentResize === null) {
			return;
		}

		var resizeOffset = currentElement.widget().resize('get');

		var currentStyle = window.getComputedStyle(currentElement, null);
		var currentHeight = parseInt(currentStyle.getPropertyValue('height'));
		var currentWidth = parseInt(currentStyle.getPropertyValue('width'));

		var maxOffsetTop = document.documentElement.clientHeight;
		var maxOffsetLeft = document.documentElement.clientWidth;
		var newTop, newLeft, newHeight = currentHeight, newWidth = currentWidth;

		var isVerticalTop = ['resize-n', 'resize-nw', 'resize-ne'].some(function(c) {
			return currentResize.classList.contains(c);
		});

		var isVerticalBottom = ['resize-s', 'resize-sw', 'resize-se'].some(function(c) {
			return currentResize.classList.contains(c);
		});

		var isHorizontalLeft = ['resize-w', 'resize-sw', 'resize-nw'].some(function(c) {
			return currentResize.classList.contains(c);
		});

		var isHorizontalRight = ['resize-e', 'resize-se', 'resize-ne'].some(function(c) {
			return currentResize.classList.contains(c);
		});

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
		currentResize = null;
	});
});
