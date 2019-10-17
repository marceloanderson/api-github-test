
function generalViewModel(){
    let self = this;

    self.userName = ko.observable("");
    self.resultUsersData = ko.observable();
    self.chosenReposData = ko.observable();
    self.chosenUserData = ko.observable();
    self.repoItemsData = ko.observableArray([]);

    ko.computed(function() {
        if(self.userName() != ""){
            self.goToSearch(self.userName())
        }
    }); 

    self.goToSearch = function(userName){
        self.chosenReposData(null);
        self.chosenUserData(null);
        self.repoItemsData([]);

        const user = userName;
        const endPointUser = "https://api.github.com/search/users?q=";
        const fieldUserName = $('#username');
    
        $.ajax({
            url: endPointUser + user,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function(data) {
                fieldUserName.attr('disabled','disabled');
            },
            success: function(data) {
                self.resultUsersData(data);
            }, 
            error: function(){
                console.log("erro");
            }
        }).done(function() {
            fieldUserName.removeAttr('disabled');
        });
    }

    self.goToRepos = function(userData) { 
        self.resultUsersData(null);
        self.chosenUserData(null);

        $.ajax({
            url: "https://api.github.com/users/" + userData.login,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                self.chosenReposData(data);

                $.ajax({
                    url: "https://api.github.com/users/" + userData.login + "/repos",
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function(reposData) {
                        self.repoItemsData(reposData);
                    }, 
                    error: function(){
                        console.log("erro ajax repos");
                    }
                });
            }, 
            error: function(){
                console.log("erro");
            }
        });
    }; 
    
    self.goToUser = function(userData) { 
        self.resultUsersData(null);
        self.chosenReposData(null);
        self.repoItemsData([]);

        $.ajax({
            url: "https://api.github.com/users/" + userData.login,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                self.chosenUserData(data);
            }, 
            error: function(){
                console.log("erro");
            }
        });
    };  
}

$(function() {
    "use strict";

    // READY
    ko.applyBindings(new generalViewModel());
});
