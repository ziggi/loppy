define(['core/widget/widget', 'core/resize/resize', 'core/move/move'], function(widget, resize, move) {
	var cursorOffsetLeft, cursorOffsetTop;
	const minOffsetTop = 0, minOffsetLeft = 0;

	widget.getAll().forEach(function(widget) {
		widget.element.addEventListener('mousedown', function(event) {
			var isNotLeftClick = event.which !== 1;
			if (isNotLeftClick) {
				return;
			}

			if (!move.isEnabled(widget)) {
				return;
			}

			if (resize.isControl(event.target)) {
				return;
			}

			cursorOffsetLeft = event.pageX - widget.element.offsetLeft;
			cursorOffsetTop = event.pageY - widget.element.offsetTop;

			move.set(widget);
		});
	});

	document.addEventListener('mouseup', function() {
		if (move.get() === null) {
			return;
		}

		move.remove();
	});

	document.addEventListener('mousemove', function(event) {
		if (move.get() === null) {
			return;
		}

		// vars
		var maxOffsetTop = document.documentElement.clientHeight;
		var maxOffsetLeft = document.documentElement.clientWidth;

		var newLeft = event.pageX - cursorOffsetLeft;
		var newTop = event.pageY - cursorOffsetTop;

		var resizeOffset = resize.getOffset(move.get());

		// check on borders
		var minLeft = minOffsetLeft + resizeOffset;
		var maxLeft = maxOffsetLeft - move.get().offsetWidth - resizeOffset;

		if (newLeft < minLeft) {
			newLeft = minLeft;
		} else if (newLeft > maxLeft) {
			newLeft = maxLeft;
		}

		var minTop = minOffsetTop +  resizeOffset;
		var maxTop = maxOffsetTop - move.get().offsetHeight - resizeOffset;

		if (newTop < minTop) {
			newTop = minTop;
		} else if (newTop > maxTop) {
			newTop = maxTop;
		}

		// update position
		move.get().element.style.left = newLeft + 'px';
		move.get().element.style.top = newTop + 'px';
	});
});
