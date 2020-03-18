(function(angular){
    var app = angular.module("app",["ui.router"]);

    app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider.state({
            name:"home",
            url:"/",
            templateUrl:"app/components/proizvodi/proizvodi.tpl.html",
            controller:"proizvodiCtrl",
            controllerAs:"pctrl"
        }).state({
            name:"idproizvod",
            url:"/proizvod/{id}",
            templateUrl:"app/components/proizvod/proizvod.tpl.html",
            controller:"proizvodCtrl",
            controllerAs:"pctrl"
        }).state({
            name:"korpa",
            url:"/korpa",
            templateUrl:"app/components/korpa/korpa.tpl.html",
            controller:"korpaCtrl",
            controllerAs:"sctrl"
        })

        $urlRouterProvider.otherwise("/");
    }]);
})(angular)