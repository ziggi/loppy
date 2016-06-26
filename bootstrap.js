require.config({
	map: {
		'*': {
			'css': 'vendor/require-css/css',
			'text': 'vendor/text/text'
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
	require(
		[
			'text!template/control.html',
			'text!template/block.html',
			'text!saved.html',
		],
		function(controlHtml, blockHtml, savedHtml) {
			container.insertAdjacentHTML('beforeend', controlHtml);
			globals.set('controlElement', document.querySelector('div.control'));

			container.insertAdjacentHTML('beforeend', blockHtml);
			globals.set('blockElement', document.querySelector('div.block'));

			globals.get('blockElement').insertAdjacentHTML('beforeend', savedHtml);

			require(['core/core']);
		}
	);
});
