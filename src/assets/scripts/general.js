const _app = window._app || {};

_app.general = {
    init(){
        console.log("init general");

        ko.applyBindings(new _app.general.AppViewModel());
        // ko.applyBindings(new _app.general.searchUserGH());
    }, 
    AppViewModel() {
        this.firstName = ko.observable("Bert");
        this.lastName = ko.observable("");
        
        this.fullName = ko.computed(function() {
            // return this.firstName() + " " + this.lastName();   
            
            $.ajax({
                url: "https://api.github.com/users/" + this.lastName(),
                type: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    console.log(data);
                }, 
                error: function(){
                    console.log("erro");
                }
            });

        }, this);
    },
    searchUserGH(){
        // const endPointUser = "https://api.github.com/users/";
        // this.userGithub = ko.observable("Teste");

        // let userGH = ko.computed(function() {
        //     return this.userGithub();    
        // }, this);

        // $.ajax({
        //     url: endPointUser + userGH,
        //     type: "GET",
        //     dataType: "json",
        //     contentType: "application/json; charset=utf-8",
        //     success: function(data) {
        //         console.log(data);
        //     }, 
        //     error: function(){
        //         console.log("erro");
        //     }
        // });
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
