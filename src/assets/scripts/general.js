const _app = window._app || {};

_app.general = {
    init(){
        console.log("init general");

        ko.applyBindings(new _app.general.AppViewModel());
    }, 
    AppViewModel() {
        this.firstName = ko.observable("Bert");
        this.lastName = ko.observable("Bertington");
        
        this.fullName = ko.computed(function() {
            return this.firstName() + " " + this.lastName();    
        }, this);
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
