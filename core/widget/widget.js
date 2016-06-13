define(['helper/parents', 'css!core/widget/widget.css'], function(parents) {
	var widgets = [];
	var listeners = {};

	return {
		add: function(params) {
			widgets.push(params);

			this.trigger('add', params);
		},
		remove: function(w) {
			var index = widgets.indexOf(w);
			if (index === -1) {
				return false;
			}

			widgets.splice(index, 1);

			this.trigger('remove', w);
			return true;
		},
		get: function(index) {
			return widgets[index];
		},
		getCount: function() {
			return widgets.length;
		},
		isValid: function(element) {
			var parent = parents(element, '.widget');
			return this.find({element: element}).length > 0 || parent.some(elem => this.find({element: elem}).length > 0);
		},
		getAllElements: function(type) {
			var elements = [];

			if (type === undefined) {
				widgets.forEach(w => elements.push(w.element));
			} else {
				this.find({type: type}).forEach(w => elements.push(w.element));
			}

			return elements;
		},
		getAll: function() {
			return widgets;
		},
		find: function(params) {
			var
				isNotFinded = false,
				result = [];

			widgets.forEach(function(w, index) {
				for (var p in params) {
					if (!params.hasOwnProperty(p)) {
						continue;
					}

					if (!w.hasOwnProperty(p)) {
						isNotFinded = true;
						break;
					}

					if (params[p] !== w[p]) {
						isNotFinded = true;
						break;
					}
				}

				if (!isNotFinded) {
					result.push(w);
				}

				isNotFinded = false;
			});

			return result;
		},
		// event system
		on: function(type, func) {
			if (!listeners.hasOwnProperty(type)) {
				listeners[type] = [];
			}

			listeners[type].push(func);
		},
		off: function(type, func) {
			if (!listeners.hasOwnProperty(type)) {
				return 0;
			}

			var index = listeners[type].indexOf(func);
			if (index === -1) {
				return 0;
			}

			listeners[type].splice(index, 1);
			return 1;
		},
		trigger: function(type, args) {
			if (!listeners.hasOwnProperty(type)) {
				return 0;
			}

			listeners[type].forEach(function(func, pos) {
				func(args);
			});
			return 1;
		}
	};
});
