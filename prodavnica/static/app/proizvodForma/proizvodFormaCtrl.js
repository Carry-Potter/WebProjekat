(function (angular) {
    var app = angular.module("Aplikacija");
    app.controller("ProizvodFormaCtrl", ["$http", "$state", "$stateParams", function ($http, $state, $stateParams) {
        var that = this;

       
        this.noviProizvod = {
            "naziv": "",
            "opis": "",
            "cena": 0,
            "slika": ""
           
        };


        this.dobaviProizvod = function(id) {
            $http.get("api/proizvodi/" + id).then(function(result){
                that.noviProizvod = result.data;
               
            }, function(reason) {
                console.log(reason);
            });
        }

        // Funkcija za dodavanje proizvoda.
        this.dodajProizvod = function () {
            
            $http.post("api/proizvodi", this.noviProizvod).then(function (response) {
                console.log(response);
                
                $state.go("admin")
            }, function (reason) {
                console.log(reason);
            });
        }

        this.izmeniProizvod = function(id) {
            $http.put("api/proizvodi/" + id, that.noviProizvod).then(function(response) {
                console.log(response)
               
                $state.go("admin");
            }, function(reason) {
                console.log(reason);
            });
        }

        this.sacuvaj = function() {
            if($stateParams["id"]) {
                this.izmeniProizvod($stateParams["id"], that.proizvod);
            } else {
                this.dodajProizvod();
            }
        }

       
        if($stateParams["id"]) {
            this.dobaviProizvod($stateParams["id"]);
        }
    }]);
})(angular);