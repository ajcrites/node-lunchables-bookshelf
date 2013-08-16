module.exports = function (app) {
    var Controller = {
        name: "BookController"
    },
        BookModel = app.models.BookModel;

    Controller.list = function (req, res) {
        BookModel.list({}, function (err, books) {
            res.format({
                html: function () {
                    if (err) {
                        res.render("books/bookshelf", {error: err});
                    }
                    else {
                        res.render("books/bookshelf", {books: books});
                    }
                },
                json: function () {
                    if (err) {
                        res.send(err.code, err);
                    }
                    else {
                        res.send(200, books);
                    }
                }
            });
        });
    };

    return Controller;
}
