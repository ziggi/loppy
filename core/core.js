define(['core/widget/widget'], function(widget) {
	widget.add(document.querySelector('.widget'));
	
	require(['widget/button/active']);
	require(['widget/button/move']);
	require(['widget/button/resize']);
});
