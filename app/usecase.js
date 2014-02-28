(function () {
    var app = angular.module('UseCaseApp', ['ngRoute']);

    app.config(config);

    app.controller('UseCaseCtrl', UseCaseCtrl);

    app.service('usecase', UseCaseDocument);

    app.service('documents', Documents);
})();
