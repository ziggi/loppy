define(function() {
	var
		globals = [];

	return {
		set: function(key, value) {
			globals[key] = value;
		},
		get: function(key) {
			return globals[key];
		},
		setDefault: function(key, value) {
			if (typeof(globals[key]) === 'undefined') {
				globals[key] = value;
			}
		}
	};
});
