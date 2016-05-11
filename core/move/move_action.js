define(['core/widget/widget', 'core/resize/resize_control', 'core/move/move'], function(widget, resizeControl, move) {
	const
		MIN_OFFSET_TOP = 0,
		MIN_OFFSET_LEFT = 0;

	var
		cursorOffsetLeft,
		cursorOffsetTop;

	widget.getAll().forEach(function(w) {
		w.element.addEventListener('mousedown', function(event) {
			var isNotLeftClick = event.which !== 1;
			if (isNotLeftClick) {
				return;
			}

			if (!move.isEnabled(w)) {
				return;
			}

			if (resizeControl.isValid(event.target)) {
				return;
			}

			cursorOffsetLeft = event.pageX - w.element.offsetLeft;
			cursorOffsetTop = event.pageY - w.element.offsetTop;

			move.set(w);
		});
	});

	document.addEventListener('mouseup', function() {
		if (move.get() === null) {
			return;
		}

		move.remove();
	});

	document.addEventListener('mousemove', function(event) {
		var w = move.get();
		if (w === null) {
			return;
		}

		// vars
		var maxOffsetTop = document.documentElement.clientHeight;
		var maxOffsetLeft = document.documentElement.clientWidth;

		var newLeft = event.pageX - cursorOffsetLeft;
		var newTop = event.pageY - cursorOffsetTop;

		var resizeOffset = resizeControl.getOffset(w);

		// check on borders
		var minLeft = MIN_OFFSET_LEFT + resizeOffset;
		var maxLeft = maxOffsetLeft - w.element.offsetWidth - resizeOffset;

		if (newLeft < minLeft) {
			newLeft = minLeft;
		} else if (newLeft > maxLeft) {
			newLeft = maxLeft;
		}

		var minTop = MIN_OFFSET_TOP +  resizeOffset;
		var maxTop = maxOffsetTop - w.element.offsetHeight - resizeOffset;

		if (newTop < minTop) {
			newTop = minTop;
		} else if (newTop > maxTop) {
			newTop = maxTop;
		}

		// update position
		w.element.style.left = newLeft + 'px';
		w.element.style.top = newTop + 'px';

		// call event
		move.process(w);
	});
});
