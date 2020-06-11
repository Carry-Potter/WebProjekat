(function(angular){
    var app=angular.module("Aplikacija")
    
    app.controller("korpaCtrl", ["$http", "$stateParams", "$state", function($http, $stateParams, $state){
        
       
        this.korpa = {};
        this.novakorpa={
            "id":"",
            
        }
        
        this.dobaviProizvodeKorpe = function() {
            $http.get("").then(function(result){
                console.log(result);
                
                this.korpa = result.data;
                
            },
            function(reason){
                console.log(reason);
            });
        }
        
        this.shop_buy = function () {
            $http.post("/korpa", this.novakorpa).then(function (response) {
                console.log(response);
               
                $state.go("korpa")
            }, function (reason) {
                console.log(reason);
            });
        }
        
        this.dobaviProizvodeKorpe();
    }]);
})(angular)