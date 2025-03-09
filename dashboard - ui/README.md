## 2. Frontend Documentation

How to setup

```bash
git clone <origin-address>
```

install node 20 and dependencies

```bash
npm install
```

For Local

```bash
npm run dev
```

For Production

```bash
npm run build
npm run start
```

### Folder Structure

.
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│ └── vite.svg
├── src
│ ├── App.css
│ ├── App.tsx
│ ├── api
│ │ └── api.ts
│ ├── assets
│ │ └── react.svg
│ ├── auth
│ │ ├── adminroutes.tsx
│ │ ├── publicroutes.tsx
│ │ └── userroutes.tsx
│ ├── components
│ │ ├── Button.tsx
│ │ ├── FormInput.tsx
│ │ ├── Sidebar.tsx
│ │ └── SidebarItem.tsx
│ ├── hooks
│ │ ├── useAuth.tsx
│ │ ├── useOnClickOutside.tsx
│ │ └── useRenderCount.tsx
│ ├── index.css
│ ├── main.tsx
│ ├── pages
│ │ ├── adminpanel.tsx
│ │ ├── adminsettings.tsx
│ │ ├── dashboard.tsx
│ │ ├── dashboardsettings.tsx
│ │ ├── login.tsx
│ │ └── signup.tsx
│ ├── redux
│ │ ├── slices
│ │ │ └── authslice.tsx
│ │ └── store
│ │ └── store.ts
│ ├── types
│ │ ├── apirequesttype
│ │ │ └── api.request.ts
│ │ ├── apiresponsetype
│ │ │ └── api.response.ts
│ │ └── common
│ │ └── common.ts
│ ├── utils
│ │ └── utils.ts
│ └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

### **Technology Stack**

- React.js
- React Router for route protection
- Redux for state management
- Axios for API communication

### **Security and Features**

- Form validation for login and registration
- Protected routes using React Router
- Persistent login using refresh tokens
- Session timeout notification
- Loading and error states handling
- httpOnly Cookies for security

---
