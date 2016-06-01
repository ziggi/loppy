define(function(require) {
	var widget = require('core/widget/widget');

	return {
		run: function(w, editbar) {
			widget.remove(w);
			editbar.hide();
		}
	}
});
