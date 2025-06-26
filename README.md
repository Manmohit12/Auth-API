## 🔐 Authenticated User API

This API is built with security in mind. Only users who are **registered and logged in** can access protected routes.  
We use **JWT authentication** to authorize users and ensure that all data is securely accessed.

### 🔑 Key Features:
- User registration & login
- Passwords are hashed before storage
- JWT token-based authentication (valid for 4 hours)
- Protected route: `/api/users` (accessible only with a valid token)
