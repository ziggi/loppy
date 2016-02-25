define(['css!core/active/active.css'], function() {
	var
		currentWidget = null,
		enabledWidgets = [];

	return {
		set: function(widget) {
			widget.element.dispatchEvent(new Event('widgetActive'));
			currentWidget = widget;
		},
		get: function() {
			return currentWidget;
		},
		isValid: function(widget) {
			return currentWidget === widget;
		},
		remove: function() {
			if (currentWidget != null) {
				currentWidget.element.dispatchEvent(new Event('widgetInactive'));	
			}
			
			currentWidget = null;
		},
		// activable
		enable: function(widget) {
			if (Array.isArray(widget)) {
				enabledWidgets = enabledWidgets.concat(widget);
			} else {
				enabledWidgets.push(widget);
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
		}
	};
});
