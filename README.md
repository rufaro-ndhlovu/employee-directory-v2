# 🗂️ Company Directory v2

A self-directed rebuild of [Company Directory v1](#) using a modern front-end stack. The original project was completed as part of a full-stack developer traineeship. This version was built to develop real-world experience with contemporary tools and architecture - learning each technology through the process of building the application itself.

> 🚧 **Status: actively in development** - core functionality is complete and the application is live.

---

## 🌐 Live Demo

[employee-directory-v2-nine.vercel.app](https://employee-directory-v2-nine.vercel.app)

> 🔐 Authentication is required to access the application. Use the sign up form to create a test account.

---

## ✨ Features

- 🔐 User authentication — sign up, sign in and sign out via Firebase Auth
- 👥 View a directory of all employees with search and filter functionality
- ➕ Add a new employee using a validated form (Formik + Yup)
- ✏️ Edit existing employee records
- 🗑️ Delete employee records
- 📱 Fully responsive - designed mobile-first

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React, CSS Modules |
| Authentication | Firebase Auth |
| Database | Firestore |
| Forms & validation | Formik, Yup |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Authentication and Firestore enabled

### Installation

```bash
git clone https://github.com/rufaro-ndhlovu/employee-directory-v2.git
cd employee-directory-v2
npm install
```

### 🔑 Environment Variables

Create a `.env.local` file in the root of the project and add your Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### ▶️ Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Project Background

This application was built as a self-directed project after completing a full-stack developer traineeship with IT Career Switch. The original Company Directory v1 was built with PHP, JavaScript, jQuery and MariaDB. Rather than moving on to a new project, the decision was made to rebuild it from scratch using the modern front-end stack used in industry today.

Each technology in this stack - React, Next.js, TypeScript, Firebase and Formik — was learned through the process of building the application, not through tutorials completed in advance. Working through real problems with unfamiliar tools produced a much deeper understanding than following guided examples.

---

## 🗺️ Roadmap

- [ ] Employee profile images via Firebase Storage
- [ ] Pagination
- [ ] Unit tests with Jest and React Testing Library
- [ ] Improved error handling and loading states

---

## 👩🏾‍💻 Author

**Rufaro Ndhlovu**
[🌐 Portfolio](https://rufarondhlovu.co.uk) · [💼 LinkedIn](https://www.linkedin.com/in/rufaro-ndhlovu-3a7392bb/) · [🐙 GitHub](https://github.com/rufaro-ndhlovu)
