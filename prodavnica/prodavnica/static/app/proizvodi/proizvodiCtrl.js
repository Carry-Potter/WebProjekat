(function(angular){
    var app = angular.module("Aplikacija");
    
   
    app.controller("proizvodiCtrl", ["$http", "$state","$scope", function($http, $state,scope){
       
        var that = this;
        this.korpa= [];
        this.proizvodi = {};
        this.noviProizvod = {
            "naziv": "",
            "opis": "",
            "cena": 0,
            "slika": "",
            
        };
         
        this.dobaviProizvode = function() {
            $http.get("/proizvodi").then(function(result){
                console.log(result);
                
                that.proizvodi = result.data;
                
            },
            function(reason){
                console.log(reason);
            });
        }
        
        
        this.dobaviProizvode();

        
    }])
})(angular);