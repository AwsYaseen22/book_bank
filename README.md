# book_bank

## route and route secure:

### public routes:

    1. get '/books' => (public-books)
    2. get '/books/:id' => (book-details)
    3. get '/logout'

### secured routes:

    1. '/' ====ensureGuest===> (dashboard)
    2. '/dashboard' ====ensureAuth===> (dashboard)
