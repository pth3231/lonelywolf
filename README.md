<h1 style="display: flex; flex-direction: column; align-items: center;">Welcome, lonelywolf!</h1>

## Setup

First, if you are a developer or a user who want to investigate about our web application, you have to install <a href="https://nodejs.org/en">Node.js</a> runtime on your machine.

If you want to clone the repository, you need to clone the app using <code>git clone</code> like the following code:

    git clone https://github.com/pth3231/lonelywolf.git
    cd lonelywolf

or you can download the .ZIP package in this repository.

Next, you have to install <a href="https://www.microsoft.com/en-us/sql-server/sql-server-downloads">Microsoft SQL Server</a> running as a service on your machine, or you can simply use Microsoft Azure and set up a new SQL Server Instance. You can read the following <a href="https://learn.microsoft.com/en-us/sql/sql-server/?view=sql-server-ver16">documentation</a> from Microsoft for further detailed information about setting up a new database, or <a href="https://learn.microsoft.com/en-us/azure/azure-sql/?view=azuresql">Microsoft Azure SQL Database documentation</a> to have more insights about Cloud platforms.

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

## APIs Configuration

### lonelywolf-backend API
In <code>lonelywolf/src/config.json</code>, we can modify some of these keys in order to set up a suitable environment:
```javascript
{
    // URL of your API
    "api_url": string
}
```

Inside <code>lonelywolf-backend/routes/</code>, we also have the same JSON file named <code>config.json</code>:
```javascript
{
    // This is a secret encrypted sequence of characters, which will be used for JWT
    "secret": string,
    // This is the client_id inside Google APIs Console
    "client_id": string,
    // This is the client_secret inside Google APIs Console
    "client_secret": string,
    // URL to your API
    "api_url": string
}
```

## Dependencies

- React
  - axios
  - universial-cookie
  - hooks (useState, useEffect, useNavigate)
  - react-router-dom
  - zustand
  - use-Sound
  - chart.js
  - react-chartjs-2
- Express
  - express-session (replaced by jsonwebtoken)
  - mssql
  - cors
  - body-parser
  - cookie-parser
  - universial-cookie
  - dotenv
  - express.router
  - nodemon
- Microsoft SQL Server (under platforms of Microsoft Azure)
- TailwindCSS

## Author

- Phan Thai Hoa (Developer, Engineer)
- Nguyen Quang Minh (Leader, Content Manager)
- Nguyen Ngoc Gia Bao (Designer)
- Pham Ngoc (Designer)
