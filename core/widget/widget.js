define(['helper/parents', 'css!core/widget/widget.css'], function(parents) {
	var
		widgets = [];

	return {
			add: function(params) {
				widgets.push(params);
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
			}
		};
});
