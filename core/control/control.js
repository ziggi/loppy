define(function(require) {
	var parents = require('helper/parents');

	return {
		isValid: function(element) {
			return parents(element, '.control').length > 0;
		}
	}
});
