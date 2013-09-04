module.exports = function (app) {
    var ObjectID = require("mongodb").ObjectID,
        Model = {
            name: "BookModel"
        },
        collection = app.db.collection("books");

    Model.list = function (query, callback) {
        try {
            collection.find(query).toArray(function (err, books) {
                if (err) {
                    console.log(Model.name + " #list error when performing find "
                        + error.toString());
                    callback(app.config.errors.database_error);
                }
                else {
                    callback(null, books);
                }
            });
        }
        catch (exception) {
            console.log(Model.name + " #list exception when performing find "
                + exception);
            callback(app.config.errors.database_error);
        }
    };

    Model.read = function (isbn, callback) {
        collection.findOne({isbn: isbn}, callback);
    };

    Model.create = function (bookToAdd, callback) {
        collection.insert(bookToAdd, callback);
    };

    Model.remove = function (isbn, callback) {
        collection.remove({isbn: isbn}, callback);
    };

    Model.update = function (isbn, book, callback) {
        collection.update({isbn: isbn}, {$set: book}, callback);
    };

    return Model;
}
