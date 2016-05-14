require.config({
	map: {
		'*': {
			'css': 'vendor/require-css/css'
		}
	}
});

define(function(require) {
	// load modules
	var globals = require('core/globals');

	// create div container
	var container = document.createElement('div');
	container.id = 'container';
	document.getElementsByTagName('body')[0].appendChild(container);

	// remember container element
	globals.set('containerElement', container);

	// load and insert html
	require(['core/loader'], function(loader) {
		// control part
		var control = loader('template/control.html');
		var toolbar = loader('core/toolbar/toolbar.html');

		control.onload = function(text) {
			container.insertAdjacentHTML('beforeend', text);
			globals.set('controlElement', document.querySelector('div.control'));

			// load other parts
			block.send();
			toolbar.send();
		}

		toolbar.onload = function(text) {
			globals.get('controlElement').insertAdjacentHTML('beforeend', text);

			// load toolbar
			require(['core/toolbar/toolbar']);
		}

		control.send();

		// block part
		var block = loader('template/block.html');
		var saved = loader('saved.html');

		block.onload = function(text) {
			container.insertAdjacentHTML('beforeend', text);
			globals.set('blockElement', document.querySelector('div.block'));

			// load saved data
			saved.send();
		}

		saved.onload = function(text) {
			globals.get('blockElement').insertAdjacentHTML('beforeend', text);

			// load core
			require(['core/core']);
		}
	});
});
