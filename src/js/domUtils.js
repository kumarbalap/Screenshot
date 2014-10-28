/*
 * domUtils.js
 *
 * Copyright 2014, Balakumar Parameshwaran - http://www.balakumarp.com/
 *
 */

 var cwsUtils = cwsUtils || {};

 cwsUtils.events = (function (win) {

    var _events = {};

    // event binding
    _events.addListener = function (elem, event, fn) {
        if (typeof elem.addEventListener === 'function') {
            return elem.addEventListener(event, fn, false);
        } else if (typeof elem.attachEvent === 'function') {
            return elem.attachEvent("on" + event, fn);
        } else {
            return elem['on' + event] = fn;
        }
    };

    // event unbinding
    _events.removeListener = function (elem, event, fn) {
        if (typeof elem.addEventListener === 'function') {
            return elem.removeEventListener(event, fn, false);
        } else if (typeof elem.attachEvent === 'function') {
            return elem.detachEvent("on" + event, fn);
        } else {
            return elem['on' + event] = null;
        }
    };

    // Prevent default Event
    _events.preventDefault = function (event) {
        if (event.preventDefault) {
            return event.preventDefault();
        } else {
            return event.returnValue = false;
        }
    };

    // Stop propagation
    _events.stopPropagation = function (event) {
        if ( event.stopPropagation ) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    };

    // get Target element
    _events.getTarget = function (event) {
        return event.target || event.srcElement;
    };

    return _events;

} (window) );