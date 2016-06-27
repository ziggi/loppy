define(function(require, exports, module) {
	// load modules
	var widget = require('core/widget/widget');
	var module = require('core/module');
	var globals = require('core/globals');
	var parents = require('helper/parents');
	var move = require('core/move/move');
	require('css!core/blockbar/blockbar.css');

	// create variables
	var blockbarElement = null;
	var previousBlock = null;

	// load and insert html
	require(['text!core/blockbar/blockbar.html'], function(html) {
		globals.get('controlElement').insertAdjacentHTML('beforeend', html);

		blockbarElement = document.querySelector('.blockbar');
	});

	// events
	document.addEventListener('mousemove', function(event) {
		var block = getBlockFromPoint(event.clientX, event.clientY);

		if (block === null || blockbarElement === null) {
			return;
		}

		blockbarElement.style.display = 'block';
		blockbarElement.style.top = block.offsetTop + block.offsetHeight + 'px';
	});

	widget.on('add', function(w) {
		move.on(w, 'set', function() {
			previousBlock = getBlockFromPoint(w.element.offsetLeft, w.element.offsetTop);
		});

		move.on(w, 'remove', function() {
			var currentBlock = getBlockFromPoint(w.element.offsetLeft, w.element.offsetTop);

			if (currentBlock === null || currentBlock === previousBlock) {
				return;
			}

			currentBlock.appendChild(w.element);
		});
	});

	function getBlockFromPoint(x, y) {
		var result = null;
		var blocks = Array.from(document.querySelectorAll('.block__item'));

		blocks.forEach(function(block) {
			if (y > block.offsetTop && y < block.offsetTop + block.offsetHeight) {
				result = block;
				return;
			}
		});

		return result;
	}
});
