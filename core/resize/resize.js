define(['css!core/resize/resize.css'], function() {
	const DEFAULT_TYPE = 'all';
	const TYPES = {
		all: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
		side: ['w', 'e'],
		popup: ['w', 'e', 'n', 's']
	};
	const OFFSET_SIZE = 7;

	var resizeWidgets = [];

	return {
		// offset
		getOffset: function() {
			return OFFSET_SIZE;
		},
		// resize
		isValid: function(widget) {
			return this.get(widget) != -1;
		},
		remove: function(widget) {
			var index = this.get(widget);
			if (index != -1) {
				resizeWidgets.splice(index, 1);	
			}

			[].forEach.call(document.querySelectorAll('.resize'), function(elem) {
				elem.remove();
			});
		},
		get: function(widget) {
			return resizeWidgets.indexOf(widget);
		},
		getAll: function() {
			return resizeWidgets;
		},
		set: function(widget, type) {
			if (this.isValid(widget)) {
				return false;
			}

			resizeWidgets.push(widget);

			if (type === undefined) {
				type = DEFAULT_TYPE;
			}

			if (TYPES[type] === undefined) {
				return false;
			}

			TYPES[type].forEach(function(elem, index) {
				widget.insertAdjacentHTML('beforeend', '<div class="resize resize-' + elem + '"></div>');
			});

			return true;
		},
		// controls
		isControl: function(element) {
			return element.classList.contains('resize');
		},
		getControls: function(element) {
			return element.querySelectorAll('.resize');
		},
		getControlType: function(controlElement) {
			return TYPES['all'].filter(e => controlElement.classList.contains('resize-' + e));
		},
	};
});
