define(['core/widget/widget', 'css!core/move/move.css'], function(widget) {
	var moveWidget = null;

	return {
		set: function(widget) {
			widget.dispatchEvent(new Event('widgetMoveStart'));
			moveWidget = widget;
		},
		get: function() {
			return moveWidget;
		},
		isValid: function(widget) {
			return moveWidget == widget;
		},
		remove: function() {
			if (moveWidget != null) {
				moveWidget.dispatchEvent(new Event('widgetMoveStop'));	
			}
			
			moveWidget = null;
		}
	};
});
