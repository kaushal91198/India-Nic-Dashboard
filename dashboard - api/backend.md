## **Features Implemented**

- User authentication with JWT and refresh tokens
- Login History
- Secure session management using Redis
- Rate limiting using Redis
- Multi-device session tracking
- Security best practices (password hashing, token security, headers, etc.)

## 1. Backend Documentation

How to setup

```
git clone <origin-address>
```

install node 20 and dependencies

```
npm install
```

For Local

```
npm run dev
```

For Production

```
npm run build
npm run start
```

### Redis Map

![alt text](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)

### **Technology Stack**

- Node.js
- Express.js
- Redis
- MongoDB
- bcrypt.js (for password hashing)
- JSON Web Tokens (JWT)

### **Security Implementations**

- Password hashing using bcrypt
- HTTP-only cookies for token storage
- Secure JWT token generation
- Refresh token rotation
- Force logout from all devices
- Security headers

### **Session Management**

- Refresh tokens stored in Redis with expiration
- Active sessions tracked using Redis hash sets
- Automatic session invalidation upon logout

### **Error Handling**

- Graceful Redis connection failure handling
- Centralized error handling middleware in Express

---

```

```
