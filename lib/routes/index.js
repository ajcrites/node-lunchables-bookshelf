module.exports = function (app) {
    var BookController = app.controllers.BookController;

    app.get("/", function (req, res) {
        res.redirect("/books");
    });

    app.get("/books", BookController.list);
    app.get("/books/:id", BookController.show);
    app.get("/new", BookController.new);
    app.put("/books/:id", BookController.update);
    app.get("/edit/:id", BookController.edit);
    app.post("/books", BookController.create);
    app.delete("/books/:isbn", BookController.remove);
}
