import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 8000;
const url = process.env.MONGO_URL;

if (!url) {
  console.error(" MONGO_URL is not defined in .env file");
  process.exit(1);
}

mongoose.connect(url)
  .then(() => {
    console.log('🍃  MongoDB connected...');
  })
  .catch((err) => {
    console.error('❌ Error while creating MongoDB connection:', err);
    process.exit(1);
  });
app.use(express.json()); // optional but recommended
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Authenticated API</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet">
        <style>
          body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #ffffff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          h1 {
            font-family: 'Poppins', sans-serif;
            font-size: 4rem; /* 6xl */
            color: #000000;
            margin: 0;
          }
          p {
            margin-top: 12px;
            font-size: 1.1rem;
            color: #444444;
            font-family: 'Segoe UI', sans-serif;
          }
          code {
            background-color: #f2f2f2;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.95rem;
          }
        </style>
      </head>
      <body>
        <h1>Authenticated-API</h1>
        <p>Serves Dummy users data — Visit <code>/help</code> for any help</p>
      </body>
    </html>
  `);
});

app.get('/help', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>API Help</title>
        <style>
          body {
            background-color: #111;
            color: #eee;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 40px;
            line-height: 1.6;
          }
          h1 {
            text-align: center;
            color: #fff;
            font-size: 3rem;
            margin-bottom: 40px;
          }
          .section {
            margin-bottom: 30px;
            background-color: #1c1c1c;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(255,255,255,0.05);
          }
          .section h2 {
            color: #ddd;
            margin-bottom: 10px;
            font-size: 1.5rem;
          }
          .section p {
            color: #bbb;
            margin: 0;
          }
          code {
            background-color: #2a2a2a;
            padding: 2px 6px;
            border-radius: 4px;
            color: #fff;
            font-weight: bold;
          }
          pre {
            background-color: #2a2a2a;
            color: #eee;
            padding: 12px;
            border-radius: 6px;
            overflow-x: auto;
            margin-top: 10px;
          }
          .highlight {
            margin-top: 40px;
            background-color: #2a2a2a;
            padding: 15px;
            border-left: 5px solid #00bcd4;
            border-radius: 6px;
            color: #f0f0f0;
            font-size: 1.1rem;
          }
          footer {
            margin-top: 50px;
            text-align: center;
            font-size: 1rem;
            color: #888;
          }
          footer a {
            color: #aaa;
            text-decoration: none;
          }
          footer a:hover {
            color: #fff;
          }
        </style>
      </head>
      <body>
        <h1>API Structure & Help</h1>

        <div class="section">
          <h2><code>/api/register</code></h2>
          <p>Use this route to register yourself in the database. <br>You must be a registered user to access protected data.</p>
        </div>

        <div class="section">
          <h2><code>/api/login</code></h2>
          <p>Use this route to log in with your credentials. <br>The token you receive will be valid for up to <strong>4 hours</strong>.</p>
        </div>

        <div class="section">
          <h2><code>/api/users</code></h2>
          <p>This route provides data of all registered users. <br><strong>Note:</strong> This is a <strong>protected route</strong>, and you must be registered to access it.</p>
        </div>

        <div class="section">
          <h2><code>/api/users/:id</code></h2>
          <p>This route returns data for a specific user by their ID. <br>Useful for retrieving individual user details. <br><strong>Note:</strong> Also a <strong>protected route</strong>; requires valid authentication.</p>
        </div>

        <div class="section">
          <h2>Input Fields for Requests</h2>
          <p><strong>Register Request Body:</strong></p>
          <pre>{
  "fullName": "Your Name",
  "email": "your@email.com",
  "password": "yourpassword"
}</pre>
          <p><strong>Login Request Body:</strong></p>
          <pre>{
  "email": "your@email.com",
  "password": "yourpassword"
}</pre>
        </div>

        <div class="section">
          <h2>Security & Authentication</h2>
          <p>This API uses <strong>JWT (JSON Web Token)</strong> authentication. <br>Your <strong>password is securely encrypted</strong> in our database. <br>We cannot view your password, ensuring your data stays private and secure.</p>
        </div>

        <div class="highlight">
          ⚠️ <strong>Important:</strong> Make sure you add the <code>Authorization</code> header with your generated token to access protected routes. <br>
          Example: <code>Authorization: your_jwt_token_here</code>
        </div>

        <footer>
          Owner of the API: <strong>Manmohit Singh</strong><br>
          <a href="https://www.linkedin.com/in/manmohit-singh-967990281/" target="_blank">
            Visit LinkedIn Profile
          </a>
        </footer>
      </body>
    </html>
  `);
});




app.listen(PORT, () => {
  console.log(` Server started at port: ${PORT}`);
});
