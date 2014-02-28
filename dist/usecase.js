function Documents() {
    var storage_key = 'documents';
    var documents = {};

    this.create = function (name) {
        documents[name] = {
            name: name
        };
    };

    this.delete = function (name) {
        delete documents[name];
    };

    this.get = function (name) {
        return documents[name];
    };

    this.has = function (name) {
        return name in documents;
    };

    this.list = function () {
        var keys = [];

        for (var i in documents) {
            keys.push(i);
        }

        return keys;
    };

    this.save = function () {
        localStorage.setItem(storage_key, angular.toJson(documents));
    };

    this.load = function () {
        documents = angular.fromJson(localStorage.getItem(storage_key) || '{}');
    };

    this.reset = function () {
        documents = {};
        this.save();
    };
}
;function DocumentsCtrl(documents) {
    documents.load();

    this.name = '';

    this.list = function () {
        return documents.list();
    };

    this.create = function () {
        documents.create(this.name, {});
        documents.save();

        this.name = '';
    };

    this.delete = function (name) {
        documents.delete(name);
        documents.save();
    };

    this.reset = function () {
        documents.reset();
    };
}
;function UseCaseCtrl(documents, document_name) {
    this.name = document_name;
}
;function UseCaseDocument() {
    var actors = ['a', 'b', 'c'];
    var cases = ['1', '2'];

    this.actors = function () {
        return actors;
    };

    this.cases = function () {
        return cases;
    };

    this.addActor = function (name) {
    };

    this.addCase = function (name) {
    };
}
;function config($routeProvider) {
    $routeProvider.when('/doc/:name', {
        controller: UseCaseCtrl,
        controllerAs: 'document',
        template: '{{ document.name }}',
        resolve: {
            document_name: function ($route) {
                return $route.current.params.name;
            }
        }
    });
}
;(function () {
    var app = angular.module('UseCaseApp', ['ngRoute']);

    app.config(config);

    app.controller('UseCaseCtrl', UseCaseCtrl);

    app.service('usecase', UseCaseDocument);

    app.service('documents', Documents);
})();
