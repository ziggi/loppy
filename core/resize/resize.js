define(['css!core/resize/resize.css'], function() {
	const DEFAULT_TYPE = 'all';
	const TYPES = {
		all: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
		side: ['w', 'e'],
		popup: ['w', 'e', 'n', 's']
	};
	const OFFSET_SIZE = 7;

	var
		currentWidget = null,
		enabledWidgets = [];

	return {
		set: function(widget, type) {
			widget.dispatchEvent(new Event('widgetResizeStart'));
			currentWidget = widget;
		},
		get: function() {
			return currentWidget;
		},
		isValid: function(widget) {
			return currentWidget == widget;
		},
		remove: function() {
			if (currentWidget != null) {
				currentWidget.dispatchEvent(new Event('widgetResizeStop'));	
			}
			
			currentWidget = null;
			[].forEach.call(document.querySelectorAll('.resize'), function(elem) {
				elem.remove();
			});
		},
		// offset
		getOffset: function() {
			return OFFSET_SIZE;
		},
		// resize
		/*isValid: function(widget) {
			return this.get(widget) != -1;
		},
		remove: function(widget) {
			var index = this.get(widget);
			if (index != -1) {
				currentWidget.splice(index, 1);	
			}

			[].forEach.call(document.querySelectorAll('.resize'), function(elem) {
				elem.remove();
			});
		},
		get: function(widget) {
			return currentWidget.indexOf(widget);
		},
		getAll: function() {
			return currentWidget;
		},
		set: function(widget, type) {
			if (this.isValid(widget)) {
				return false;
			}

			currentWidget.push(widget);

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
		},*/
		// resizeable
		enable: function(widget, params) {
			if (Array.isArray(widget)) {
				enabledWidgets = enabledWidgets.concat(widget);
			} else {
				enabledWidgets.push({
					widget: widget,
					params: params
				});
			}
		},
		disable: function(widget) {
			if (Array.isArray(widget)) {
				enabledWidgets = enabledWidgets.filter(w => widget.indexOf(w) === -1);
			} else {
				var index = enabledWidgets.indexOf(widget);
				if (index != -1) {
					currentWidget.splice(index, 1);	
				}
			}
		},
		isEnabled: function(widget) {
			return enabledWidgets.indexOf(widget) != -1;
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
		}
	};
});
