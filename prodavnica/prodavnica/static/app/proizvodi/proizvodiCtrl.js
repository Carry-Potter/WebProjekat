(function(angular){
    var app = angular.module("Aplikacija");
    
   
    app.controller("proizvodiCtrl", ['loginService',"$http", "$state","$scope", function(loginService,$http, $state,  scope){
       
        var that = this;
        this.korpa= [];
        this.proizvodi = {};
        this.noviProizvod = {
            "naziv": "",
            "opis": "",
            "cena": 0,
            "slika": "",
            
        };
         this.aProizvodi=[];
        this.dobaviProizvode = function() {
            $http.get("/proizvodi").then(function(result){
                console.log(result);
                
                that.aProizvodi = result.data;
                for(var i=0;i<that.proizvodi.lenght;i++){
                    that.aProizvodi.push(that.proizvodi[i]);
                    that.aProizvodi[i].kolicina=0;
                }
            },
            function(reason){
                console.log(reason);
            });
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

        
        this.shop_buy = function (k) {
            console.log(that.user);
            console.log(k);
            k.user_id=this.user.user_id;
          
            $http.post("/korpa/", that.k).then(function (response) {
                console.log(response);
               
                $state.go("/korpa")
            }, function (reason) {
                console.log(reason);
            });
        }


        that.login();
        
        
        this.dobaviProizvode();

        
    }])
})(angular);