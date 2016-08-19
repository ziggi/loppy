define(function() {
	return {
		run: function(w) {
			if (w.element.style.zIndex > 0) {
				w.element.style.zIndex--;
			}
		}
	}
});
