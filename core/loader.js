define(function() {
	return function(filename) {
		var result = {
			send: function() {
				request.send();
			}
		};

		var request = new XMLHttpRequest();
		request.open('POST', filename);

		request.onload = function(event) {
			if (typeof(result.onload) == 'function') {
				result.onload(event.target.responseText);
			}
		};

		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

		return result;
	};
});
