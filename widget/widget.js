function widget(widget) {
	// TODO: check on valid widget
	this.widget = widget;
};

document.addEventListener('appload', function() {
	Element.prototype.widget = function() {
		return (new widget(this));
	};

	[].forEach.call(document.querySelectorAll('.widget'), function(element) {
		element.addEventListener('widget__inactive', function() {
			this.classList.remove('widget__active');
			this.widget().resize('reset');
		});

		element.addEventListener('widget__active', function() {
			this.classList.add('widget__active');
		});
	});
});
