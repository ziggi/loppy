define(function() {
	return function(widgetName) {
		var currentWidget = null;
		var enabledWidgets = [];
		var listeners = {};

		return {
			set: function(widget) {
				if (currentWidget === widget) {
					return;
				}

				if (currentWidget !== null) {
					this.remove();
				}

				this.trigger(widget, 'set');
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

				this.trigger(currentWidget, 'remove');
				currentWidget = null;
			},
			process: function() {
				if (currentWidget === null) {
					return;
				}

				this.trigger(currentWidget, 'process');
			},
			// activable
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
			},
			// event system
			on: function(w, type, func) {
				if (!listeners.hasOwnProperty(type)) {
					listeners[type] = [];
				}

				listeners[type].push({
					widget: w,
					listener: func
				});
			},
			off: function(w, type, func) {
				if (!listeners.hasOwnProperty(type)) {
					return 0;
				}

				var index = listeners[type].indexOf({
					widget: w,
					listener: func
				});

				if (index === -1) {
					return 0;
				}

				listeners[type].splice(index, 1);
				return 1;
			},
			trigger: function(w, type, args) {
				if (!listeners.hasOwnProperty(type)) {
					return 0;
				}

				listeners[type].forEach(function(elem) {
					if (w === elem.widget) {
						elem.listener(args);
					}
				});
				return 1;
			}
		};
	};
});
