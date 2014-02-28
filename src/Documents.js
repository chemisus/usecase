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
