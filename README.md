BASE_URL : "https://git.heroku.com/water-plants-brandon.git"

ENDPOINTS:

Authentication side:

[POST] (Sign-up/Register) = ("/api/auth/register")

[POST] (Login) = ("/api/auth/login")

USERS

[GET] "/api/users/:id" || returns an array with the single user identified with the specified id

[PUT] "api/users/:id || allows to update a user within the database already

PLANTS

[GET] "/api/plants/" || returns an array with the all the plants in the database.

[GET] "/api/plants/:id" || returns an array with the single plant identified with the specified id

[PUT] "api/plants/:id || allows to update a plant within the database already

[DELETE] "/api/plants/:id" || deletes following plant by its plant_id
