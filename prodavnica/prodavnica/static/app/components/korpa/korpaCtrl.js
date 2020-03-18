(function(angular){
    var app = angular.module("app");
    
    
    app.controller("korpaCtrl", ["$http", "$state","$scope", function($http, $state,$scope){
        korpa: Array
        
   
        var that = this;
       
        
        this.korpa = [];
          
        this.dobaviKorpa = function() {
            $http.get("/korpa").then(function(result){
                console.log(result);
                
                that.korpa = result.data;
                
            },
            function(reason){
                console.log(reason);
            });
        }
       
    }]);
   
     
})(angular);