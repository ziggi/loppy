define(['css!core/resize/resize.css'], function() {
	var
		currentWidget = null,
		enabledWidgets = [];

	return {
		set: function(widget) {
			if (currentWidget === widget) {
				return;
			}

			if (currentWidget !== null ) {
				this.remove();
			}

			widget.element.dispatchEvent(new Event('widgetResizeStart'));
			currentWidget = widget;
		},
		get: function() {
			return currentWidget;
		},
		isValid: function(widget) {
			return currentWidget == widget;
		},
		remove: function() {
			if (currentWidget === null) {
				return;
			}

			currentWidget.element.dispatchEvent(new Event('widgetResizeStop'));
			currentWidget = null;
		},
		// resizeable
		enable: function(widget, params) {
			if (Array.isArray(widget)) {
				widget.forEach(function(w) {
					enabledWidgets.push({
						widget: w,
						params: params
					});
				});
			} else {
				enabledWidgets.push({
					widget: widget,
					params: params
				});
			}
		},
		disable: function(widget) {
			if (Array.isArray(widget)) {
				widget.forEach(function(w) {
					var index = enabledWidgets.indexOf(enabledWidgets.find(rw => rw.widget === w));
					if (index != -1) {
						enabledWidgets.splice(index, 1);
					}
				});
			} else {
				var index = enabledWidgets.indexOf(enabledWidgets.find(rw => rw.widget === widget));
				if (index != -1) {
					enabledWidgets.splice(index, 1);
				}
			}
		},
		isEnabled: function(widget) {
			return enabledWidgets.filter(rw => rw.widget === widget).length != 0;
		},
		getParams: function(widget) {
			var param = null;

			enabledWidgets.forEach(function(rw) {
				if (rw.widget === widget) {
					param = rw.params;
					return false;
				}
			});

			return param;
		}
	};
});
