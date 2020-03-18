(function(angular){
    var app = angular.module("app");
    
   
    app.controller("proizvodiCtrl", ["$http", "$state","$scope", function($http, $state,scope){
       
        var that = this;
        this.korpa= [];
        this.proizvodi = {};
          
        this.dobaviProizvode = function() {
            $http.get("/proizvodi").then(function(result){
                console.log(result);
                
                that.proizvodi = result.data;
                
            },
            function(reason){
                console.log(reason);
            });
        }
        this.uzmiproizvod=function(id){
            
            that.korpa.push(id);
            console.log(that.korpa);
            
        }
              // Funkcija za dodavanje proizvoda.
              this.dodajproizvod = function () {
                $http.post("/korpa" ).then(function (response) {
                    console.log(response);
                   
                }, function (reason) {
                    console.log(reason);
                    console.log("greska!!!!!!!!!!");
                });
            }
        this.korpanapunjena=function(){
            $scope.emit(that.korpa)
        }
        
        
        
        this.dobaviProizvode();

        
    }])
})(angular);