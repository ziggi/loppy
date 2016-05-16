define(function() {
	var doc = document.documentElement;

	return {
		getTop: function() {
			return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		},
		getLeft: function() {
			return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
		}
	};
});
