(function(angular){
    // Dobavljanje postojeceg modula app.
    var app = angular.module("Aplikacija");

    // Kreiranje kontrolera pod nazivom ProizvodiCtrl.
    // Ovaj kontroler zavisi od servisa $http. Zavisnosti
    // se navode kao spisak stringova koji sadrze nazive
    // zavisnosti. Umetanje zavisnosti vrsi se preko parametara
    // funkcije koja predstavlja implementaciju kontrolera.
    // Nazivi parametara mogu biti proizvoljni.
    // Razlog za ovakav nacin umetanja zavisnosti je sto se
    // prilikom minifikacije stringovi ne menjaju pa ce se
    // samim tim sacuvati nazivi zavisnosti. Da su zavisnosti
    // navedene samo kao parametri funkcije, tokom minifikacije,
    // nazivi parametara bi se promenili pa nazivi navedenih
    // zavisnosti ne bi odgovarali nazivima zadatih zavisnosti.
    app.controller("adminCtrl", ["$http", function($http) {
        var that = this; // Neophodno je primenovati this
                         // kako bi se promenljiva this mogla
                         // koristiti u ugnjezdenim funkcijama.

        this.proizvodi = []; // Inicijalno proizvodi nisu dobavljeni.
        
        // Funkcija za dobavljanje proizvoda.
        this.dobaviProizvodeA = function() {
            // Upucuje se get zahtev na relativni URL api/proizvodi.
            $http.get("api/admin").then(function(result){
                console.log(result);
                that.proizvodi = result.data;
            },
            function(reason) {
                console.log(reason);
            });
        }

        // Funkcija za uklanjanje proizvoda.
        this.ukloniProizvod = function(id) {
            // Pri uklanjanju proizvoda serveru se salje delete zahtev
            // na url api/proizvodi/<id> pri cemu id zavisi od proizvoda
            // koji je neophodno obrisati.
            $http.delete("api/admin/" + id).then(function(response){
                console.log(response);
                that.dobaviProizvodeA();
            },
            function(reason){
                console.log(reason);
            });
        }
        
        this.dobaviProizvodeA();
    }]);
})(angular);