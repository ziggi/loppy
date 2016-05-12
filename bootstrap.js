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
		var block = loader('template/block.html');
		var control = loader('template/control.html');
		var saved = loader('saved.html');

		block.onload = function(text) {
			container.insertAdjacentHTML('beforeend', text);
			globals.set('blockElement', document.querySelector('div.block'));

			// load saved data
			saved.send();
		}

		control.onload = function(text) {
			container.insertAdjacentHTML('beforeend', text);
			globals.set('controlElement', document.querySelector('div.control'));
		}

		saved.onload = function(text) {
			globals.get('blockElement').insertAdjacentHTML('beforeend', event.target.responseText);

			// load core
			require(['core/core']);
		}

		block.send();
		control.send();
	});
});
