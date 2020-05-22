(function (angular) {
    //Kreiranje angular aplikacije.
    //Ova aplikacija nema dodatnih zavisnosti.
    var app = angular.module('Aplikacija', ['ui.router', 'ngFileUpload', 'loginService']);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        //Korensko apstraktno stanje, kontejner za ostala stanja.
        $stateProvider.state('app', {
            abstract: true,
            views: {
                //Navbar se prikazuje na svakoj stranici.
                navbar: {
                    templateUrl: 'app/navbar/navbar.tpl.html',
                    controller: 'NavbarCtrl',
                    controllerAs: 'nb'
                },
                //Ostale stranice ce se prikazivati u ovom view-u.
                '': {
                    //Potomak korenskog view-a, u njemu se prikazuju ostali template-i.
                    template: '<ui-view name=""></ui-view>'
                }
            }
        })
        //Moglo je i app.home ali bi moralo da se menja
        //referenciranje pomocu ui-sref.
        $stateProvider.state('home', {
            url: '/',
            parent: 'app', //Da se ne bi menjalo referenciranje stanja
            views: {       //u ui-sref ovde se navodi parent.
                '': {
                    templateUrl: 'app/proizvodi/proizvodi.tpl.html',
                    controller: 'proizvodiCtrl',
                    controllerAs: 'pctrl'
                }
            }
        }).state('proizvod', {
            parent: 'app',
            url: 'proizvod/{id}',
            views: {
                '': {
                    templateUrl: 'app/proizvod/proizvod.tpl.html',
                    controller: 'proizvodCtrl',
                    controllerAs: 'pctrl'
                }
            }
        })
        .state('login', {
            parent: 'app',
            url: '/login',
            views: {
                '': {
                    templateUrl: 'app/login/login.tpl.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'lc'
                }
            }
        }).state('userProfile', {
            parent: 'app',
            url: '/userProfile',
            views: {
                '': {
                    templateUrl: 'app/user-profile/user-profile.tpl.html',
                    controller: 'UserProfileCtrl',
                    controllerAs: 'up'
                }
            }
        }).state('registracija', {
            parent: 'app',
            url: '/registracija',
            views:{
                '':{
                    templateUrl: 'app/registracija/registracija.tpl.html',
                    controller: 'RegistracijaCtrl',
                    controllerAs: 'rc'
                }
            }
        }).state('onama', {
            parent: 'app',
            url: '/onama',
            views: {
                '': {
                    templateUrl: 'app/onama/onama.tpl.html',
                    
                    controllerAs: 'pctrl'
                }
            }
        }).state('korpa', {
            parent: 'app',
            url: '/korpa',
            views: {
                '': {
                    templateUrl: 'app/korpa/korpa.tpl.html',
                    controller: 'korpaCtrl',
                    controllerAs: 'Kctrl'
                }
            }
        })
    }]);
})(angular);