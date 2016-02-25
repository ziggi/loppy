define(['core/widget/widget'], function(widget) {
	var widgets = document.querySelectorAll('.widget');

	widgets.forEach(function(w) {
		widget.add({element: w, type: 'button'});
	});
	
	require(['widget/button/button']);
});
