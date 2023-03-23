# ADMIN USER STORIES

## Admin should be able to:

- login/logout
- add/remove/eddit films in the currently_displaying db table
- set movies in the cinema halls
- view the bookings in a certain cinema hall
- view all the bookings depending on the filters, i.e. daily, hourly etc

# CUSTOMERS USER STORIES

## Customer should be able to:

- login/logout
- view their profile
- check all the booking they currently have
- view the currently_displaying shows/movies
- book a ticket with a specific seat
- cancel bookings

# DATABASE SCHEMA

## The database will have following tables:

- admin
- customer
- customer_bookings
- currently_displaying
- cinema_halls

### admin will have following fields:

- admin_id (pk)
- username
- password
- email

### customer will have following fields:

- customer_id (pk)
- username
- password
- email

### customer_bookings will have following fields:

- ticket_number(pk)
- customer_id (fk references customer(customer_id))
- booking_date
- row_number
- column_number
- movie (fk references currently_displaying(movie_id))
- hall_id (fk references cinema_halls(hall_id))

### currently_displaying will have following records:

- movie_id (pk)
- movie_title
- movie_discription
- movie_poster_url
- movie_rating
- hall_id (fk references cinema_hall(hall_id))
- start_time
- end_time

### cinema_halls will have following fields:

- hall_id (pk)
- total_seats
- booked_seats
- load (total_seats - booked_seats)
- current_movie (fk references currently_displaying(movie_id))
