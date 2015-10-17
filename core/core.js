window.addEventListener('load', function() {
	// create div container
	var container = document.createElement('div');
	container.id = 'container';
	document.getElementsByTagName('body')[0].appendChild(container);

	// load and insert html
	var request = new XMLHttpRequest();
	request.open('POST', 'saved/index.html');

	request.onload = function(event) {
		container.insertAdjacentHTML('beforeend', event.target.responseText);
		document.dispatchEvent(new Event('appload'));
	};

	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.send();
});
