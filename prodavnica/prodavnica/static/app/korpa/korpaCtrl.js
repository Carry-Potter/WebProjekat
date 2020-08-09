(function(angular){
    var app=angular.module("Aplikacija")
    
    app.controller("korpaCtrl", ['loginService', "$http", "$stateParams", "$state", "$scope", function(loginService, $http, $stateParams, $state, $scope){
        
        var that = this;
        this.korpa = {};
        this.novakorpa={
            "id":"",
            
        }
        that.login=function(){
            loginService.isLoggedIn(function () {
                loginService.getLoggedIn(function (user) {
                    that.user = user;
                    
                },
                function (errorReason) {
                    console.log(errorReason);
                })
            
            })
        }

        
        
        this.dobaviProizvodeKorpe = function() {
           
            $http.get("/korpa" ).then(function(result){
                console.log(result);
                console.login(that.korpa);
                this.korpa = result.data;
                
            },
            function(reason){
                console.log(reason);
            });
        }
        // this.login=function(user){
        //     this.user=user;
        // }
        that.login();
        this.dobaviProizvodeKorpe();
        // loginService.addLoginListener($scope, this.login);
    }]);
})(angular)