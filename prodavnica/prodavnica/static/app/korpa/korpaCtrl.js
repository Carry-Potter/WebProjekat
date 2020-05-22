(function(angular){
    var app=angular.module("Aplikacija")
    
    app.controller("korpaCtrl", ["$http", "$stateParams", "$state", function($http, $stateParams, $state){
        var that = this;
       
        this.korpa = {};
        
        this.dobaviProizvodeKorpe = function() {
            $http.get("/korpa").then(function(result){
                console.log(result);
                
                that.korpa = result.data;
                
            },
            function(reason){
                console.log(reason);
            });
        }
        
        
        this.dobaviProizvodeKorpe();
    }]);
})(angular)