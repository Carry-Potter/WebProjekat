(function(angular){
    var app=angular.module("app")
    
    app.controller("proizvodCtrl", ["$http", "$stateParams", "$state", function($http, $stateParams, $state){
        var that = this;
        this.proizvod = {};
       
    this.idproizvodi = function(id){
        $http.get("/proizvod/" + id).then(function(result){
            that.proizvod = result.data;
                console.log(result);
               
            },
            function(reason){
                console.log(reason);
            })
        }
    this.idproizvodi($stateParams["id"]);
    }]);
})(angular)