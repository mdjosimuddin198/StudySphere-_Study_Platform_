# 📘 Collaborative Study Platform

A **Full-Stack Web Application** that connects **Students**, **Tutors**, and **Admins** for effective **study session management**, **material sharing**, and **collaborative learning**.

---

## 🌐 Live Demo

[https://simple-firebase-authenti-d1f36.firebaseapp.com/](https://simple-firebase-authenti-d1f36.firebaseapp.com/)

## 🚀 Features

### 👨‍🎓 Student

- ✅ View and book available study sessions
- ✅ Access and download shared study materials
- ✅ Apply to become a tutor
- ✅ Create, manage, and delete personal notes

### ADMIN

Admin email: josimuddin0504@gmail.com

Admin password: AddminCanNotBeDenger45

### 🧑‍🏫 Tutor

- ✅ Post new study sessions
- ✅ Upload and manage educational materials

### 🛡️ Admin

- ✅ Approve or reject tutor applications
- ✅ Manage all users (students, tutors, admins)
- ✅ Search users by email
- ✅ Assign or remove admin roles
- ✅ View all booked sessions and uploaded study materials

---

## 🧩 Technologies Used

### ⚛️ Frontend

- **React.js**
- **React Router DOM**
- **Tailwind CSS** + **DaisyUI**
- **Axios** + **TanStack Query**
- **React Hook Form**
- **SweetAlert2**

### 🖥️ Backend

- **Node.js** + **Express.js**
- **MongoDB** (with **Mongoose**)
- **jsonwebtoken (JWT)** for custom token-based verification
- **Firebase Authentication**
- Other Utilities: `cors`, `dotenv`, `helmet`, etc.

---

## 🔐 Authentication & Authorization

- Firebase Authentication (Email/Password based)
- Custom JWT tokens for secured API access
- Role-based access control:
  - **Student**: Limited access
  - **Tutor**: Session and material management
  - **Admin**: Full platform control

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/collaborative-study-platform.git
cd collaborative-study-platform
```

### 2️⃣ Set up Frontend

```bash
cd client
npm install
npm run dev
```

### 3️⃣ Set up Backend

```bash
cd server
npm install
npm run start
```

### 🔑 Environment Variables

Create a `.env` file in both `client` and `server` folders:

#### Server `.env`

```
PORT=5000
DB_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```

#### Client `.env`

```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

---

---

## 📌 Future Improvements

- ✅ Chat between students and tutors
- ✅ Advanced search and filter
- ✅ Session reminders via email

---

## 🙌 Author

**Md Josim Uddin**  
Front-End Developer  
[LinkedIn](https://www.linkedin.com/in/mdjosimuddin198/) | [Portfolio](https://josimuddin198.vercel.app/)

---

## 📝 License

This project is licensed under the **MIT License**.
