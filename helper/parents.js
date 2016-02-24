define(function() {
	return function(elem, selector) {
		var elements = [];
		var ishaveselector = selector !== undefined;

		while ((elem = elem.parentElement) !== null) {
			if (elem.nodeType !== Node.ELEMENT_NODE) {
				continue;
			}

			if (!ishaveselector || elem.matches(selector)) {
				elements.push(elem);
			}
		}

		return elements;
	};
});
