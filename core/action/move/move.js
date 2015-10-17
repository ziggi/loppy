document.addEventListener('appload', function() {
	var currentElement = null;
	var cursorOffsetLeft, cursorOffsetTop;
	var minOffsetTop = 0;
	var minOffsetLeft = 0, maxOffsetLeft = document.documentElement.clientWidth;

	[].forEach.call(document.querySelectorAll('.widget'), function(element) {
		element.addEventListener('mousedown', function(event) {
			var isNotLeftClick = event.which !== 1;
			if (isNotLeftClick) {
				return;
			}

			var isResizeBlock = event.target.classList.contains('resize');
			if (isResizeBlock) {
				return;
			}

			cursorOffsetLeft = event.pageX - element.offsetLeft;
			cursorOffsetTop = event.pageY - element.offsetTop;

			currentElement = element;
			currentElement.classList.add('move');
			currentElement.querySelector('.widget__item').classList.add('move');
		});
	});

	document.addEventListener('mouseup', function() {
		if (currentElement === null) {
			return;
		}

		currentElement.classList.remove('move');
		currentElement.querySelector('.widget__item').classList.remove('move');
		currentElement = null;
	});

	document.addEventListener('mousemove', function(event) {
		if (currentElement === null) {
			return;
		}

		var newLeft = event.pageX - cursorOffsetLeft;
		var newTop = event.pageY - cursorOffsetTop;

		// check on borders
		var resizeOffset = currentElement.widget().resize('get');

		if (newLeft < minOffsetLeft + resizeOffset) {
			newLeft = minOffsetLeft + resizeOffset;
		} else if (newLeft > maxOffsetLeft - currentElement.offsetWidth - resizeOffset) {
			newLeft = maxOffsetLeft - currentElement.offsetWidth - resizeOffset;
		}

		if (newTop < minOffsetTop +  resizeOffset) {
			newTop = minOffsetTop +  resizeOffset;
		} else if (newTop > document.documentElement.clientHeight - currentElement.offsetHeight - resizeOffset) {
			newTop = document.documentElement.clientHeight - currentElement.offsetHeight - resizeOffset;
		}

		// update position
		currentElement.style.left = newLeft + 'px';
		currentElement.style.top = newTop + 'px';
	});
});
