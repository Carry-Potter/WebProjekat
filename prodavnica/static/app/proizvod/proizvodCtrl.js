(function(angular){
    var app=angular.module("Aplikacija")
    
    app.controller("proizvodCtrl", ["$http", "$stateParams", "$state", function($http, $stateParams, $state){
        var that = this;
        this.proizvod = {};
        this.noviProizvod = {
            "naziv": "",
            "opis": "",
            "cena": 0,
            "slika":""
        };
       
        this.dobaviproizvod = function(id){
        $http.get("api/proizvodi/" + id).then(function(result){
            that.proizvod = result.data;
            console.log(result);
            },
            function(reason){
                console.log(reason);     
               
            })
        }
    this.dobaviproizvod($stateParams["id"]);
    }]);
})(angular)