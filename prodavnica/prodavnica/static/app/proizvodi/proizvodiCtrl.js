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
          this.shop_buy = function () {
           
            $http.post("/", this.noviProizvod).then(function (response) {
                console.log(response);
               
                $state.go("/")
            }, function (reason) {
                console.log(reason);
            });
        }
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