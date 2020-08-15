(function(angular){
    var app=angular.module("Aplikacija")
    
    app.controller("proizvodCtrl", ["$http", "$stateParams", "$state", function($http, $stateParams, $state){
        var that = this;
        this.proizvod = [];
        this.noviProizvod = {
            "naziv": "",
            "opis": "",
            "cena": 0,
            "slika":""
        };
       
        this.dobaviproizvod = function(id){
        $http.get("api/proizvod/" + id).then(function(result){
            that.noviProizvod = result.data;
            console.log(id);
            },
            function(reason){
               
                console.log(reason);     
               
            })
        }
    this.dobaviproizvod($stateParams["id"]);
    }]);
})(angular)