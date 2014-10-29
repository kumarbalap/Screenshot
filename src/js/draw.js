/*
 * draw.js
 *
 * Copyright 2014, Balakumar Parameshwaran - http://www.balakumarp.com/
 *
 */

var cwsDraw = (function () {

    var st = {
        element: null,
        canvas: null,
        elemWidth: 0,
        mousePos: {
            x: 0,
            y: 0,
            startX: 0,
            startY: 0            
        }
    };

    var mousePos = st.mousePos;

    var init = function (elem) {
        st.canvas = elem;

        drawEvents.mousemove( mousemoveCB );
        drawEvents.click( clickCB );
    };

    var drawEvents = {
        mousemove: function(fn) {
            cwsUtils.events.addListener(st.canvas, 'mousemove', fn);
        },
        click: function(fn) {
            cwsUtils.events.addListener(st.canvas, 'click', fn);
        }
    };

    var setMousePosition = function (event) {
        event = event || window.event;
        if (event.pageX) {
            mousePos.x = event.pageX + window.pageXOffset;
            mousePos.y = event.pageY + window.pageYOffset;
        } else if (event.clientX) {
            mousePos.x = event.clientX + document.body.scrollLeft;
            mousePos.y = event.clientY + document.body.scrollTop;
        }
    };

    var mousemoveCB = function (e) {
        setMousePosition(e);

        if (st.element !== null) {
            st.element.style.width = Math.abs(mousePos.x - mousePos.startX) + 'px';
            st.element.style.height = Math.abs(mousePos.y - mousePos.startY) + 'px';
            st.element.style.left = (mousePos.x - mousePos.startX < 0) ? mousePos.x + 'px' : mousePos.startX + 'px';
            st.element.style.top = (mousePos.y - mousePos.startY < 0) ? mousePos.y + 'px' : mousePos.startY + 'px';

            st.elemWidth = Math.abs(mousePos.x - mousePos.startX);
            //st.elemHeight = Math.abs(mousePos.y - mousePos.startY);
            //st.elemLeft = (mousePos.x - mousePos.startX < 0) ? mousePos.x : mousePos.startX;
            //st.elemTop = (mousePos.y - mousePos.startY < 0) ? mousePos.y : mousePos.startY;
        }
    };

    var clickCB = function (event) {

        if (st.element !== null) {
            //Add Close button for the created element
            elementCloseHandler();

            st.element = null;
            st.canvas.style.cursor = "default";
            console.log("done");
        } else {
            var target = cwsUtils.events.getTarget(event);
            if (target.className == 'rectangle' || target.className == 'dlgClose') {
                return false;
            }

            console.log("start");
            mousePos.startX = mousePos.x;
            mousePos.startY = mousePos.y;
            st.element = document.createElement('div');
            st.element.className = 'rectangle';
            st.element.style.left = mousePos.x + 'px';
            st.element.style.top = mousePos.y + 'px';

            st.canvas.appendChild(st.element);
            st.canvas.style.cursor = "crosshair";

            //st.element.contentEditable = true;
            cwsUtils.events.addListener(st.element, 'click', function() {
                this.contentEditable = true;
            });
        }
    };

    // Adding Close handler and Removing the Element
    var elementCloseHandler = function() {
        var close = document.createElement('span');
        close.className = 'dlgClose';
        close.style.left = (st.elemWidth + 20) + 'px';
        close.style.top =   (-10) + 'px';
        st.element.appendChild(close);

        cwsUtils.events.addListener(close, 'click', function() {
            st.canvas.removeChild(this.parentNode);
        });
    };    

    return {
        init: init
    }    

})();
