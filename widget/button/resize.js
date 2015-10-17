document.addEventListener('appload', function() {
	[].forEach.call(document.querySelectorAll('.widget'), function(element) {
		element.addEventListener('widget__active', function() {
			this.widget().resize('init', 'all');

			document.querySelector('.resize-n').addEventListener('mousedown', function() {
				console.log('test');
			});
		});
	})
});
