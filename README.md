
# aceraven777 Pokedex Documentation

## Tech Stack

- PHP (Backend Language)
- Laravel (PHP Framework)
- MySQL (Database)
- InertiaJS [React] (Frontend)

## Requirements

- PHP
- MySQL

## Installation

1. Clone the repository
2. In your terminal, `cd` inside the project folder and run `cp .env.example .env`.
3. Open the `.env` file and fill-out your database credentials.
4. Run the ff. command below:

```
composer install
php artisan key:generate
php artisan migrate
```

5. Run the following command to seed the MySQL database with pokemon content from the `public/pokedex.json`.

```
php artisan db:seed
```

## Running the application
Run the command `php artisan serve`

Then you can visit http://127.0.0.1:8000 on your local browser.

## Developer Comments

Hours worked is around 6 hours. Based on the requirement I have to use ReactJS, I'm not very familiar coding with ReactJS and I have to study and familiarized myself with ReactJS and InertiaJS. I'm used on using VueJS as frontend framework.

Due to the limited amount of time and my unfamiliarity with ReactJS, I didn't made it a SPA.