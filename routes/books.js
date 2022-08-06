const express = require("express");
const router = express.Router();
// protect routes with middle ware
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Book = require("../models/Book");
const { formatDate, truncate } = require("../helpers/ejs");

// show add new book
router.get("/add", ensureAuth, (request, response) => {
  response.render("pages/books/add.ejs");
});

// show public books
router.get("/", async (request, response) => {
  try {
    const allBooks = await Book.find({ status: "public" })
      .populate("user") // get the full detail of the user belongs to this book
      .sort({ createdAt: "desc" })
      .lean(); // return pure object
    return response.render("pages/books/public-books", {
      allBooks,
      formatDate,
      truncate,
    });
  } catch (error) {
    console.error({ error });
    return response.render("pages/errors/500");
  }
  response.render("pages/books/add.ejs");
});

// save new book to the db
router.post("/", ensureAuth, async (request, response) => {
  try {
    // get the user id to attached it with the book model
    request.body.user = request.user.id;
    console.log("****", request.body);
    await Book.create(request.body);
    response.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    response.render("pages/errors/500");
  }
});

// show EDIT book page
router.get("/edit/:id", ensureAuth, async (request, response) => {
  const book = await Book.findById(request.params.id).lean();
  console.log(book.user.toJSON());
  console.log(request.user.id);
  if (!book) {
    return response.render("pages/errors/404");
  }
  // ensure the user logged in is the same as the book user
  if (book.user.toJSON() !== request.user.id) {
    response.redirect("/");
  } else {
    response.render("pages/books/edit.ejs", { book });
  }
});

module.exports = router;
