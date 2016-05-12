define(function(require) {
	// load modules
    var widget = require('core/widget/widget');
    var guide = require('core/guide/guide');
    var globals = require('core/globals');
    var loader = require('core/loader');

    // create variables
    var anchorTypes = ['vertical', 'horizontal'];
    var allAnchors = {
        vertical: [],
        horizontal: []
    };
    var currentAnchors = {
        vertical: [],
        horizontal: []
    };
    var isShowed = {
        vertical: false,
        horizontal: false
    };
    var isLoopEnded = {
        vertical: false,
        horizontal: false
    };
    var guideElement = {
        vertical: null,
        horizontal: null
    };

    // load and insert html
    var guideLoader = loader('core/guide/guide.html');

    guideLoader.onload = function(text) {
        globals.get('controlElement').insertAdjacentHTML('beforeend', text);

        anchorTypes.forEach(function(type) {
            guideElement[type] = document.querySelector('.guide__' + type);
        });
    }

    guideLoader.send();

    // add event handlers to widgets
    widget.getAll().forEach(function(w) {
        w.element.addEventListener('widgetMoveSet', function(event) {
            if (!guide.isEnabled(w)) {
                return;
            }

            widget.getAll().forEach(function(w2) {
                if (w === w2) {
                    return;
                }

                if (!guide.isEnabled(w2)) {
                    return;
                }

                allAnchors.vertical.push(
                    w2.element.offsetLeft,
                    w2.element.offsetLeft + w2.element.offsetWidth / 2,
                    w2.element.offsetLeft + w2.element.offsetWidth
                );

                allAnchors.horizontal.push(
                    w2.element.offsetTop,
                    w2.element.offsetTop + w2.element.offsetHeight / 2,
                    w2.element.offsetTop + w2.element.offsetHeight
                );
            });
        });

        w.element.addEventListener('widgetMoveRemove', function(event) {
            if (!guide.isEnabled(w)) {
                return;
            }

            anchorTypes.forEach(function(type) {
                allAnchors[type] = [];
                guideHide(type, w);
            });
        });

        w.element.addEventListener('widgetMoveProcess', function(event) {
            if (!guide.isEnabled(w)) {
                return;
            }

            currentAnchors.vertical = [
                w.element.offsetLeft,
                w.element.offsetLeft + w.element.offsetWidth / 2,
                w.element.offsetLeft + w.element.offsetWidth
            ];

            currentAnchors.horizontal = [
                w.element.offsetTop,
                w.element.offsetTop + w.element.offsetHeight / 2,
                w.element.offsetTop + w.element.offsetHeight
            ];

            anchorTypes.forEach(function(type) {
                allAnchors[type].forEach(function(anchorPos) {
                    currentAnchors[type].forEach(function(currentAnchorPos) {
                        if (currentAnchorPos > anchorPos - 2 && currentAnchorPos < anchorPos + 2) {
                            guideShow(type, w, anchorPos);

                            isLoopEnded[type] = true;
                            return;
                        } else if (isShowed[type] && !isLoopEnded[type]) {
                            guideHide(type, w);

                            isLoopEnded[type] = true;
                        }
                    });

                    if (isLoopEnded[type]) {
                        return;
                    }
                });

                isLoopEnded[type] = false;
            });
        });
    });

    function guideHide(type, widget) {
        isShowed[type] = false;
        guideElement[type].style.display = 'none';

        guide.remove(widget);
    }

    function guideShow(type, widget, pos) {
        isShowed[type] = true;
        guideElement[type].style.display = 'block';

        if (type === 'vertical') {
            guideElement.vertical.style.left = pos + 'px';
        } else if (type === 'horizontal') {
            guideElement.horizontal.style.top = pos + 'px';
        }

        guide.set(widget);
    }
});
