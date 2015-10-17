document.addEventListener('appload', function() {
	[].forEach.call(document.querySelectorAll('.widget'), function(element) {
		element.addEventListener('mouseenter', function() {
			var isActive = this.querySelectorAll('.widget.widget__active').length !== 0;
			if (!isActive) {
				this.classList.add('widget__hover');
			}
		});

		element.addEventListener('mouseleave', function() {
			this.classList.remove('widget__hover');
		});
	});
});
