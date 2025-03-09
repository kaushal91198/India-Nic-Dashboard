## 3. API Documentation

### **Authentication APIs**

| Endpoint           | Method | Description                        |
| ------------------ | ------ | ---------------------------------- |
| `/auth/register`   | POST   | Register a new user                |
| `/auth/login`      | POST   | Authenticate user and issue tokens |
| `/auth/logout`     | POST   | Logout user from current session   |
| `/auth/logout-all` | POST   | Force logout from all devices      |
| `/user/profile`    | GET    | Fetch user profile                 |

### **Security Measures in API**

- Secure password hashing using bcrypt
- JWT token generation and validation
- Refresh token expiration and rotation
- httpOnly Cookie
- Rate limiting with Redis to prevent abuse

---
