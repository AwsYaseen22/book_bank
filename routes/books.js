const express = require("express");
const router = express.Router();
// protect routes with middle ware
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Book = require("../models/Book");

// show add new book
router.get("/add", ensureAuth, (request, response) => {
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

module.exports = router;
