define(['core/widget/widget', 'core/resize/resize'], function(widget, resize) {
	const DEFAULT_TYPE = 'all';
	const TYPES = {
		all: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
		side: ['w', 'e'],
		popup: ['w', 'e', 'n', 's']
	};
	const OFFSET_SIZE = 7;

	var
		currentElement = null;

	return {
		set: function(element) {
			element.dispatchEvent(new Event('widgetResizeControlStart'));
			currentElement = element;
		},
		get: function() {
			return currentElement;
		},
		isValid: function(element) {
			return currentElement == element;
		},
		remove: function() {
			if (currentElement === null) {
				return
			}

			currentElement.dispatchEvent(new Event('widgetResizeControlStop'));
			currentElement = null;
		},
		getOffset: function() {
			return OFFSET_SIZE;
		},
		getElements: function(element) {
			return Array.from(element.querySelectorAll('.resize'));
		},
		getElementType: function(resizeControlElement) {
			return TYPES['all'].filter(e => resizeControlElement.classList.contains('resize-' + e));
		},
		getNames: function(type) {
			if (type === undefined) {
				type = DEFAULT_TYPE;
			}

			if (TYPES[type] == undefined) {
				return null;
			}

			return TYPES[type];
		}
	};
});
