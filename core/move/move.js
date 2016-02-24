define(['core/widget/widget', 'core/resize/resize', 'css!core/move/move.css'], function(widget, resize) {
	var cursorOffsetLeft, cursorOffsetTop;
	const minOffsetTop = 0, minOffsetLeft = 0;

	widget.getAll().forEach(function(element) {
		element.addEventListener('mousedown', function(event) {
			var isNotLeftClick = event.which !== 1;
			if (isNotLeftClick) {
				return;
			}

			if (resize.isControl(event.target)) {
				return;
			}

			cursorOffsetLeft = event.pageX - element.offsetLeft;
			cursorOffsetTop = event.pageY - element.offsetTop;

			widget.setMove(element);
		});
	});

	document.addEventListener('mouseup', function() {
		if (widget.getMove() === null) {
			return;
		}

		widget.removeMove();
	});

	document.addEventListener('mousemove', function(event) {
		if (widget.getMove() === null) {
			return;
		}

		// vars
		var maxOffsetTop = document.documentElement.clientHeight;
		var maxOffsetLeft = document.documentElement.clientWidth;

		var newLeft = event.pageX - cursorOffsetLeft;
		var newTop = event.pageY - cursorOffsetTop;

		var resizeOffset = resize.getOffset(widget.getMove());

		// check on borders
		var minLeft = minOffsetLeft + resizeOffset;
		var maxLeft = maxOffsetLeft - widget.getMove().offsetWidth - resizeOffset;

		if (newLeft < minLeft) {
			newLeft = minLeft;
		} else if (newLeft > maxLeft) {
			newLeft = maxLeft;
		}

		var minTop = minOffsetTop +  resizeOffset;
		var maxTop = maxOffsetTop - widget.getMove().offsetHeight - resizeOffset;

		if (newTop < minTop) {
			newTop = minTop;
		} else if (newTop > maxTop) {
			newTop = maxTop;
		}

		// update position
		widget.getMove().style.left = newLeft + 'px';
		widget.getMove().style.top = newTop + 'px';
	});
});
