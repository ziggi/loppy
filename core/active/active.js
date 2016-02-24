define(['css!core/active/active.css'], function() {
	var activeWidget = null;

	return {
		set: function(widget) {
			widget.dispatchEvent(new Event('widgetActive'));
			activeWidget = widget;
		},
		get: function() {
			return activeWidget;
		},
		isValid: function(widget) {
			return activeWidget === widget;
		},
		remove: function() {
			if (activeWidget != null) {
				activeWidget.dispatchEvent(new Event('widgetInactive'));	
			}
			
			activeWidget = null;
		}
	};
});
