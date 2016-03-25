define(['core/widget/widget', 'css!core/move/move.css'], function(widget) {
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

			widget.element.dispatchEvent(new Event('widgetMoveStart'));
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

			currentWidget.element.dispatchEvent(new Event('widgetMoveStop'));
			currentWidget = null;
		},
		// movable
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
