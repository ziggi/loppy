define(function(require) {
	var widget = require('core/widget/widget');
	var active = require('core/active/active');

	return {
		run: function(w) {
			var parentNode = w.element.parentNode;
			var newWidget = Object.create(w);

			newWidget.element = w.element.cloneNode(true);

			newWidget.element.style.left = (parentNode.offsetWidth / 2 - w.element.offsetWidth / 2) + 'px';
			newWidget.element.style.top = (parentNode.offsetHeight / 2 + w.element.offsetHeight / 2) + 'px';

			parentNode.appendChild(newWidget.element);

			widget.add(newWidget);
			active.set(newWidget);
		}
	}
});
