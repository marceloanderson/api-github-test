
function searchUser(userName){
    const user = userName;
    const endPointUser = "https://api.github.com/search/users?q=";

    $.ajax({
        url: endPointUser + user,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function(data) {
            
        },
        success: function(data) {
            console.log(data);
            console.log(data.items.length);
            
        }, 
        error: function(){
            console.log("erro");
        }
    });
}

function usersViewModel(){
    console.log("usersViewModel");

    this.userName = ko.observable("");

    ko.computed(function() {
        if(this.userName() != ""){
            searchUser(this.userName())
        }
    }, this);
}

$(function() {
    "use strict";

    // READY
    ko.applyBindings(new usersViewModel());

    // LOAD
    $(window).load(function () {
        // 
    });
});
