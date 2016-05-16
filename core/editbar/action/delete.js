define(function() {
	return {
		run: function(w, editbar) {
			var element = w.element;
			element.parentNode.removeChild(element);
			editbar.hide();
		}
	}
});
