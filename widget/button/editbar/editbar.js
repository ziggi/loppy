define(function(require) {
	// load modules
	var widget = require('core/widget/widget');
	var module = require('core/module');
	var globals = require('core/globals');
	var editbar = require('core/editbar/editbar');
	require('css!widget/button/editbar/editbar.css');

	//
	return {
		show: function(w) {
			console.log('show\n', w);
		}
	}
});
