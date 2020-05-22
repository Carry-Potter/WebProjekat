(function (angular){
    var app = angular.module('Aplikacija');
    app.controller('RegistracijaCtrl', ["$http", '$state', function ($http, $state){
        var that = this;
        that.user=[];
        that.failed = false;
        that.addUser = {
            'username': '',
            'password': '',
            'name': '',
            'surname': ''
        }

        this.uzimanjeReg = function() {
            $http.get("/registracija").then(function(response){
                that.user = response.data;
            }, function(response) {
                console.log(response);
            })
        }

        this.registracija = function() {
            $http.post("/registracija", that.addUser).then(function(response){
                that.uzimanjeReg();
                $state.go('home');
            }, function(){
                that.failed = true;
            });
        }
        this.uzimanjeReg();
        }]);
})(angular);