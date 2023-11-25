<h1 style="display: flex; flex-direction: column; align-items: center;">Welcome, lonelywolf!</h1>

## Setup

First, if you are a developer or a user who want to investigate about our web application, you have to install <a href="https://nodejs.org/en">Node.js</a> runtime on your machine.

If you want to clone the repository, you need to clone the app using <code>git clone</code> like the following code:

    git clone https://github.com/pth3231/lonelywolf.git
    cd lonelywolf

or you can download the .ZIP package in this repository.

Next, you have to install <a href="https://mariadb.com/products/">MariaDB Database</a> running as a service on your machine. You can read the following <a href="https://mariadb.com/kb/en/documentation/">documentation</a> for detailed information about setting up a new database.

## Run Frontend

After setting up the web app, you have to be in the <code>lonelywolf</code> folder, then use

```javascript
npm start
```

to run the web on <code>http://localhost:3000/</code>

## Run Backend

After being in <code>lonelywolf</code>, you can use the following syntax (in the new console, in different process) to run your server

```javascript
// if you want to use nodemon
npx nodemon server.js

// or if you just want to use the ordinary one
node server.js
```

## Dependencies

- React
  - axios
  - universial-cookie
  - hooks (useState, useEffect, useNavigate)
  - react-router-dom
- Express
  - express-session (replaced by jsonwebtoken)
  - mariadb
  - cors
  - body-parser
  - cookie-parser
  - universial-cookie
  - dotenv
  - express.router
  - nodemon
- MariaDB
- TailwindCSS

## Author

- Phan Thai Hoa (Developer, Engineer)
- Nguyen Quang Minh (Leader, Content Manager)
- Nguyen Ngoc Gia Bao (Designer)
- Pham Ngoc (Designer)
