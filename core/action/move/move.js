document.addEventListener('appload', function() {
	[].forEach.call(document.querySelectorAll('.widget'), function(element) {
		var isMoving = false;
		var cursorOffsetLeft, cursorOffsetTop;
		var minOffsetTop = 0;
		var minOffsetLeft = 0, maxOffsetLeft = document.documentElement.clientWidth;

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

			isMoving = true;
			this.classList.add('move');
			this.querySelector('.widget__item').classList.add('move');
		});

		document.addEventListener('mouseup', function() {
			if (!isMoving) {
				return;
			}

			isMoving = false;
			element.classList.remove('move');
			element.querySelector('.widget__item').classList.remove('move');
		});

		document.addEventListener('mousemove', function(event) {
			if (!isMoving) {
				return;
			}

			var newLeft = event.pageX - cursorOffsetLeft;
			var newTop = event.pageY - cursorOffsetTop;

			// check on borders
			var resizeOffset = element.widget().resize('get');

			if (newLeft < minOffsetLeft + resizeOffset) {
				newLeft = minOffsetLeft + resizeOffset;
			} else if (newLeft > maxOffsetLeft - element.offsetWidth - resizeOffset) {
				newLeft = maxOffsetLeft - element.offsetWidth - resizeOffset;
			}

			if (newTop < minOffsetTop +  resizeOffset) {
				newTop = minOffsetTop +  resizeOffset;
			} else if (newTop > document.documentElement.clientHeight - element.offsetHeight - resizeOffset) {
				newTop = document.documentElement.clientHeight - element.offsetHeight - resizeOffset;
			}

			// update position
			element.style.left = newLeft + 'px';
			element.style.top = newTop + 'px';
		});
	});
});
