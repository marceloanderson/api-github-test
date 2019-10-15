
function usersViewModel(){
    console.log("INIT usersViewModel");
    let self = this;

    self.searchUser = function(userName){
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
                console.log(data);
                self.resultUsersData(data.items);
            }, 
            error: function(){
                console.log("erro");
            }
        }).done(function() {
            fieldUserName.removeAttr('disabled');
        });
    }

    self.userName = ko.observable("");
    self.resultUsersData = ko.observableArray([]);

    ko.computed(function() {
        if(self.userName() != ""){
            self.searchUser(self.userName())
        }
    });     

    // self.totalResultUsers = ko.computed(function() {
    //     let total = 0;
        
    //     return total;
    // }); 
}


// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);

    self.formattedPrice = ko.computed(function() {
        var price = self.meal().price;
        return price ? "$" + price.toFixed(2) : "None";        
    });    
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];    

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0]),
        new SeatReservation("Bert", self.availableMeals[0])
    ]);

    // Computed data
    self.totalSurcharge = ko.computed(function() {
       var total = 0;
       for (var i = 0; i < self.seats().length; i++)
           total += self.seats()[i].meal().price;
       return total;
    });    

    // Operations
    self.addSeat = function() {
        self.seats.push(new SeatReservation("", self.availableMeals[0]));
    }
    self.removeSeat = function(seat) { self.seats.remove(seat) }
}

$(function() {
    "use strict";

    // READY
    ko.applyBindings(new usersViewModel());
    // ko.applyBindings(new ReservationsViewModel());

    // LOAD
    $(window).load(function () {
        // 
    });
});
