define(['core/widget/widget', 'core/guide/guide'], function(widget, guide) {
	var
		anchorTypes = ['vertical', 'horizontal'],

		allAnchors = {
			vertical: [],
			horizontal: []
		},

		currentAnchors = {
			vertical: [],
			horizontal: []
		},

		isShowed = {
			vertical: false,
			horizontal: false
		},

		isLoopEnded = {
			vertical: false,
			horizontal: false
		},

		guideElement = {
			vertical: document.querySelector('.guide_vertical'),
			horizontal: document.querySelector('.guide_horizontal')
		};

	widget.getAll().forEach(function(w) {
		w.element.addEventListener('widgetMoveSet', function(event) {
			if (!guide.isEnabled(w)) {
				return;
			}

			widget.getAll().forEach(function(w2) {
				if (w === w2) {
					return;
				}

				if (!guide.isEnabled(w2)) {
					return;
				}

				allAnchors.vertical.push(
					w2.element.offsetLeft,
					w2.element.offsetLeft + w2.element.offsetWidth / 2,
					w2.element.offsetLeft + w2.element.offsetWidth
				);

				allAnchors.horizontal.push(
					w2.element.offsetTop,
					w2.element.offsetTop + w2.element.offsetHeight / 2,
					w2.element.offsetTop + w2.element.offsetHeight
				);
			});
		});

		w.element.addEventListener('widgetMoveRemove', function(event) {
			if (!guide.isEnabled(w)) {
				return;
			}

			anchorTypes.forEach(function(type) {
				allAnchors[type] = [];
				guideHide(type, w);
			});
		});

		w.element.addEventListener('widgetMoveProcess', function(event) {
			if (!guide.isEnabled(w)) {
				return;
			}

			currentAnchors.vertical = [
					w.element.offsetLeft,
					w.element.offsetLeft + w.element.offsetWidth / 2,
					w.element.offsetLeft + w.element.offsetWidth
				];

			currentAnchors.horizontal = [
					w.element.offsetTop,
					w.element.offsetTop + w.element.offsetHeight / 2,
					w.element.offsetTop + w.element.offsetHeight
				];

			anchorTypes.forEach(function(type) {
				allAnchors[type].forEach(function(anchorPos) {
					currentAnchors[type].forEach(function(currentAnchorPos) {
						if (currentAnchorPos > anchorPos - 2 && currentAnchorPos < anchorPos + 2) {
							guideShow(type, w, anchorPos);

							isLoopEnded[type] = true;
							return;
						} else if (isShowed[type] && !isLoopEnded[type]) {
							guideHide(type, w);

							isLoopEnded[type] = true;
						}
					});

					if (isLoopEnded[type]) {
						return;
					}
				});

				isLoopEnded[type] = false;
			});
		});
	});

	function guideHide(type, widget) {
		isShowed[type] = false;
		guideElement[type].style.display = 'none';

		guide.remove(widget);
	}

	function guideShow(type, widget, pos) {
		isShowed[type] = true;
		guideElement[type].style.display = 'block';

		if (type === 'vertical') {
			guideElement.vertical.style.left = pos + 'px';
		} else if (type === 'horizontal') {
			guideElement.horizontal.style.top = pos + 'px';
		}

		guide.set(widget);
	}
});
