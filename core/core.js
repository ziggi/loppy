define(['core/widget/widget'], function(widget) {
	widget.add(document.querySelector('.widget'));
	require(['widget/button/resize']);
	require(['widget/button/active']);
	require(['core/move/move']);
});
