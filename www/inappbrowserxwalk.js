/*global cordova, module*/

function InAppBrowserXwalkSparh() {
 
}

var callbacks = new Array ();

InAppBrowserXwalkSparh.prototype = {
    close: function () {
        cordova.exec(null, null, "InAppBrowserXwalkSparh", "close", []);
    },
    addEventListener: function (eventname, func) {
        callbacks[eventname] = func;
    },
    removeEventListener: function (eventname) {
        callbacks[eventname] = undefined;
    },
    show: function () {
        cordova.exec(null, null, "InAppBrowserXwalkSparh", "show", []);
    },
    hide: function () {
        cordova.exec(null, null, "InAppBrowserXwalkSparh", "hide", []);
    }
}

var callback = function(event) {
    if (event.type === "loadstart" && callbacks['loadstart'] !== undefined) {
        callbacks['loadstart'](event.url);
    }
    if (event.type === "loadstop" && callbacks['loadstop'] !== undefined) {
        callbacks['loadstop'](event.url);
    }
    if (event.type === "exit" && callbacks['exit'] !== undefined) {
        callbacks['exit']();
    }
}

module.exports = {
    open: function (url, options) {
        options = (options === undefined) ? "{}" : JSON.stringify(options);
        cordova.exec(callback, null, "InAppBrowserXwalkSparh", "open", [url, options]);
        return new InAppBrowserXwalk();
    }
};
