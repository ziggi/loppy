require.config({
	map: {
		'*': {
			'css': 'vendor/require-css/css'
		}
	}
});

define(function(require) {
	// create div container
	var container = document.createElement('div');
	container.id = 'container';
	document.getElementsByTagName('body')[0].appendChild(container);

	// load and insert html
	var request = new XMLHttpRequest();
	request.open('POST', 'saved/index.html');

	request.onload = function(event) {
		container.insertAdjacentHTML('beforeend', event.target.responseText);
		require(['core/core']);
	};

	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.send();
});
