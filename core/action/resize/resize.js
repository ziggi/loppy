document.addEventListener('appload', function() {
	const DEFAULT_TYPE = 'all';
	const TYPES = {
		all: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
		side: ['w', 'e'],
		popup: ['w', 'e', 'n', 's']
	};
	const OFFSET_SIZE = 7;

	widget.prototype.resize = function(action, type) {
		if (action === undefined) {
			action = 'init';
		}

		var that = this;

		if (action === 'init') {
			if (type === undefined) {
				type = defaultType;
			}

			TYPES[type].forEach(function(element, index) {
				that.widget.insertAdjacentHTML('beforeend', '<div class="resize-block resize-block-' + element + '"></div>');
			});

			return true;
		} else if (action === 'reset') {
			[].forEach.call(document.querySelectorAll('.resize-block'), function(element) {
				element.remove();
			});

			return true;
		} else if (action === 'get') {
			if (type === undefined) {
				type = 'size';
			}

			if (type === 'size') {
				return OFFSET_SIZE;
			}

			return false;
		}

		return false;
	};
});
