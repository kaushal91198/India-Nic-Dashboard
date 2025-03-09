## Database Documentation

### **Database Used:**

- **MongoDB** (NoSQL database)

### **Collections and Schema**

#### **Users Collection**

```json
{
  "_id": {
    "$oid": "67cd42a41e51c9c5c676ffff"
  },
  "firstname": "kaushal",
  "lastname": "panchal",
  "email": "kaushal@esparkbiz.com",
  "password": "$2b$10$UJC9lc5lFxJbMHzMlqmrhOJsYKxdwZKyYJlZH2TkzTC4CCz/w4XgO",
  "address": "Ranip Sarvesh appartment",
  "phoneNumber": "12345676890",
  "role": "admin",
  "gender": "male",
  "country": "India",
  "createdAt": {
    "$date": "2025-03-09T07:26:28.565Z"
  },
  "updatedAt": {
    "$date": "2025-03-09T07:26:28.565Z"
  },
  "__v": 0
}
```

#### **Login History Collection**

```json
{
  "_id": {
    "$oid": "67cc22fae4f3ddc1cb4cc4a0"
  },
  "user": {
    "$oid": "67cbd238aa51269ae6fbcaa2"
  },
  "sessionId": "9bd33955-e1cb-4d49-b523-7971dabcca39",
  "ipAddress": "::1",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  "loginTime": {
    "$date": "2025-03-08T10:59:06.288Z"
  },
  "__v": 0
}
```

### **Redis Implementation**

- **Key-Value Storage for Refresh Tokens:**
  - `refreshToken:<userId>` → stores refresh token with expiration
- **Hash Sets for Active Sessions:**
  - `activeSessions:<userId>` → stores active session details per user
- **Key Expiration for Automatic Cleanup**

---

## **Conclusion**

This documentation outlines the authentication system's backend, frontend, API, and database structures. The implementation follows best security practices and ensures scalable session management using Redis. If any modifications or enhancements are required, refer to the corresponding section for details.
