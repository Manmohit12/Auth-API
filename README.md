# 🔐 Authenticated User API

## 📋 Project Summary

The Authenticated User API is a secure backend service built with Node.js, Express, and MongoDB, designed to handle user authentication and management. It provides a robust foundation for applications requiring user registration, login, and protected access to resources. The API ensures data security through password hashing, JWT-based authentication, and input validation, making it suitable for web applications, mobile apps, and microservices.

## 🎯 Use Cases

This API is ideal for a variety of applications that need secure user management:

- **Web Applications**: Integrate user authentication for login-protected dashboards, e-commerce sites, or content management systems.
- **Mobile Apps**: Provide secure user sessions and data access for iOS/Android applications requiring user accounts.
- **Microservices**: Serve as an authentication microservice in a larger distributed system, handling user verification and token management.
- **API Gateways**: Act as a central authentication point for multiple services, ensuring consistent security across platforms.
- **SaaS Platforms**: Enable multi-tenant applications with secure user isolation and access control.

## 🔑 Key Features

- **User Registration & Login**: Secure endpoints for creating new user accounts and authenticating existing users.
- **Password Security**: Passwords are hashed using bcrypt before storage to prevent unauthorized access.
- **JWT Authentication**: Token-based authentication with tokens valid for 4 hours, ensuring stateless and scalable sessions.
- **Protected Routes**: Access control for sensitive endpoints like `/api/users` and `/api/users/:id`, requiring valid JWT tokens.
- **Input Validation**: Comprehensive validation using Joi to ensure data integrity and prevent malicious inputs.
- **MongoDB Integration**: Persistent data storage with Mongoose ODM for efficient user data management.
- **Error Handling**: Robust error responses and logging for better debugging and user experience.
- **CORS Support**: Configurable cross-origin resource sharing for frontend integration.

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd auth-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   PORT=8000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

## 📖 Usage

### API Endpoints

- **POST /api/register**: Register a new user
  - Body: `{ "fullName": "string", "email": "string", "password": "string" }`
  - Response: User data with JWT token

- **POST /api/login**: Authenticate user
  - Body: `{ "email": "string", "password": "string" }`
  - Response: JWT token

- **GET /api/users**: Get all users (Protected)
  - Headers: `Authorization: Bearer <jwt_token>`
  - Response: Array of user objects

- **GET /api/users/:id**: Get user by ID (Protected)
  - Headers: `Authorization: Bearer <jwt_token>`
  - Response: User object

### Example Usage

```javascript
// Register a new user
fetch('/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'securepassword'
  })
})
.then(response => response.json())
.then(data => console.log(data));

// Login
fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securepassword'
  })
})
.then(response => response.json())
.then(data => {
  const token = data.token;
  // Use token for protected routes
});
```

## 📚 API Documentation

For detailed API documentation and examples, visit the `/help` route when the server is running, or refer to the inline comments in the source code.

## 🛠️ Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Token-based authentication
- **bcrypt**: Password hashing
- **Joi**: Input validation
- **dotenv**: Environment variable management
