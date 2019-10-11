const _app = window._app || {};

_app.general = {
    init(){
        console.log("init general");
    }, 
    initLoad(){
        console.log("initLoad general");
    }
}

$(function() {
    "use strict";

    // READY
    _app.general.init();

    // LOAD
    $(window).load(function () {
        _app.general.initLoad();
    });
});
