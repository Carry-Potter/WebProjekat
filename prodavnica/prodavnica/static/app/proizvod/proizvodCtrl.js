(function(angular){
    var app=angular.module("Aplikacija")
    
    app.controller("proizvodCtrl", ["$http", "$stateParams", "$state", function($http, $stateParams, $state){
        var that = this;
        this.proizvod = [];
       
        this.dobaviproizvod = function(id){
        $http.get("/proizvod/" + id).then(function(result){
            that.proizvod = result.data;
            console.log(id);
            },
            function(reason){
               
                console.log(reason);     
               
            })
        }
    this.dobaviproizvod($stateParams["id"]);
    }]);
})(angular)