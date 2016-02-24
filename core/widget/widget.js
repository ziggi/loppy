define(['helper/parents', 'css!core/widget/widget.css'], function(parents) {
	var
		widgets = [];
		activeElement = null,
		moveElement = null;

	return {
		// widget
		add: function(element) {
			widgets.push(element);
		},
		get: function(element) {
			var index = widgets.indexOf(element);
			if (index != -1) {
				return widgets[index];	
			}

			return null;
		},
		remove: function(element) {
			widgets.remove(element);
		},
		isValid: function(element) {
			var parent = parents(element, '.widget');
			return widgets.indexOf(element) != -1 || parent.some(elem => widgets.indexOf(elem) != -1);
		},
		getAll: function(type) {
			if (type === undefined) {
				return widgets;
			}

			return widgets.filter(elem => elem.querySelector('.' + type) != null);
		}
	};
});
