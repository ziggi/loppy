define(function(require) {
	var widget = require('core/widget/widget');

	const DEFAULT_TYPE = 'all';
	const TYPES = {
		all: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
		side: ['w', 'e'],
		exside: ['w', 'e', 'n', 's'],
		corner: ['ne', 'se', 'sw', 'nw']
	};
	const OFFSET_SIZE = 7;

	var currentElement = null;

	return {
		set: function(element) {
			element.dispatchEvent(new Event('widgetResizeControlSet'));
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

			currentElement.dispatchEvent(new Event('widgetResizeControlRemove'));
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
