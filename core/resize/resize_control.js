define(function(require) {
	// load modules
	var widget = require('core/widget/widget');
	var module = require('core/module');

	// constants
	const DEFAULT_TYPE = 'all';
	const TYPES = {
		all: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
		side: ['w', 'e'],
		exside: ['w', 'e', 'n', 's'],
		corner: ['ne', 'se', 'sw', 'nw']
	};
	const OFFSET_SIZE = 7;

	//
	var currentElement = null;
	var resizeControl = module('ResizeControl');

	resizeControl.getOffset = function() {
		return OFFSET_SIZE;
	};

	resizeControl.getElements = function(element) {
		return Array.from(element.querySelectorAll('.resize'));
	};

	resizeControl.getElementType = function(resizeControlElement) {
		return TYPES['all'].filter(e => resizeControlElement.classList.contains('resize-' + e));
	};

	resizeControl.getNames = function(type) {
		if (type === undefined) {
			type = DEFAULT_TYPE;
		}

		if (TYPES[type] == undefined) {
			return null;
		}

		return TYPES[type];
	};

	return resizeControl;
});
