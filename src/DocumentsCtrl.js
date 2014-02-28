function DocumentsCtrl(documents) {
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
