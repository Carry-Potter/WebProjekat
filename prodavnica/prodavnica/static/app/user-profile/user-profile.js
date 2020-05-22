(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('UserProfileCtrl', ['loginService', '$state', 'Upload', '$scope', function (loginService, $state, Upload, $scope) {
        var that = this;
        that.user = {};
        that.editUser = {};

        that.fetchData = function () {
            loginService.isLoggedIn(function () {
                loginService.getLoggedIn(function (user) {
                    that.user = user;
                    // Da bi se izazvalo osvezavanje slike
                    // na url slike dodaje se timestamp koji nema nikakvo znacenje.
                    that.user.avatar += "?timestamp=" + Date.now();
                    that.editUser = angular.copy(that.user);
                },
                function (errorReason) {
                    console.log(errorReason);
                })
            },
            function () {
                $state.go('login');
            });
        }

        that.updateUser = function () {
            Upload.upload({
                url: 'users/' + that.editUser.id,
                method: 'PUT',
                data: {avatar: that.editUser.newAvatar,
                       userData: Upload.json(that.editUser)}}).then(function () {
                that.fetchData();
            },
            function (reason) {
                console.log(reason);
            });
        }

        that.fetchData();
    }]);
})(angular);