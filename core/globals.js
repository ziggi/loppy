define(function() {
	var
		globals = [];

	return {
		set: function(key, value) {
			globals[key] = value;
		},
		get: function(key) {
			return globals[key];
		}
	};
});
