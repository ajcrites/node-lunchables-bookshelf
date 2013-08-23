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

    Controller.show = function (req, res) {
        BookModel.read(req.params.id, function (err, book) {
            res.format({
                html: function () {
                    if (book) {
                        res.render("books/book", {book: book});
                    }
                    else {
                        res.status(404).send();
                    }
                },
                json: function () {
                    res.json(book);
                }
            });
        });
    };

    Controller.new = function (req, res) {
        res.render("books/new");
    };

    Controller.create = function (req, res) {
        BookModel.create(req.body, function (err, book) {
            res.status(201).send("Location: /books/" + book[0].isbn);
        });
    };

    return Controller;
}
