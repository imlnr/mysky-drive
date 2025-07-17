---

```markdown
# 🌤️ SkyDrive

SkyDrive is a modern and secure file management system—like your personal Google Drive clone. Upload, manage, organize, and share your files and folders in a clean and intuitive interface. Built using the MERN stack, SkyDrive features user authentication, folder hierarchy, file previews, trash bin with auto-deletion, and cloud file storage with ImageKit.

---

## 📁 Monorepo Structure

```

SkyDrive/
├── frontend/       # React + Vite + Tailwind CSS app
└── backend/        # Node.js + Express + MongoDB API

````

---

## 🚀 Features

- 🔐 Authentication (JWT-based login/register)
- 📂 Create nested folders & upload multiple files
- 📁 Folder & file previews
- 🗑️ Soft delete with a 7-day restore period (Trash Bin)
- 🧹 Bulk delete & cleanup for expired items
- ☁️ File hosting with ImageKit
- 📧 SMTP support for notifications (optional)

---

## 🛠️ Tech Stack

**Frontend:**

- React + Vite
- Tailwind CSS + ShadCN UI
- Axios, React Router DOM

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- ImageKit SDK
- Nodemailer
- dotenv, jsonwebtoken, multer

---

## 📦 Installation

### Prerequisites

- Node.js v18+
- MongoDB (cloud/local)
- ImageKit account
- SMTP credentials (for email features)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/skydrive.git
cd skydrive
````

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```
PORT=4500

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_ISSUER=your_jwt_issuer
JWT_EXPIRATION=1h

# MongoDB
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/skydrive?retryWrites=true&w=majority

# Email (SMTP)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_smtp_password

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

Then run:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Make sure your frontend `.env` (if needed) points to the correct backend URL:

```
VITE_API_URL=http://localhost:4500
```

---

## 🔄 Folder & File System Design

- Files and folders are stored in MongoDB with references to their parent folder and owner.
- Soft deletes add a `deletedAt` timestamp.
- Trash bin fetches both deleted files and folders.
- After 7 days, they are permanently removed by a scheduled job or admin action.

---

## 📂 Example API Structure

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| POST   | `/users/register`   | Register a new user    |
| POST   | `/users/login`      | Login existing user    |
| POST   | `/folders`          | Create a folder        |
| POST   | `/files/upload`     | Upload files           |
| GET    | `/files/folder/:id` | Get files in folder    |
| DELETE | `/files/:id`        | Move file to trash     |
| DELETE | `/trash/deleteAll`  | Permanently delete all |

---

## 🧪 Sample Trash Bin Logic

- Files/folders marked with `deletedAt`
- API checks whether 7 days have passed since deletion
- If yes, they’re permanently deleted (can be scheduled using a CRON job)

---

## 📸 Demo

*Coming soon...*

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

Created by [M Laxminarayan Reddy](https://github.com/your-username)
For inquiries, contact: `bablureddy553@gmail.com`

---

```

Let me know if you want:

- CRON job example for auto-delete  
- Sample frontend UI preview section  
- GitHub badges and actions  
- Docker setup  
I can enhance the README further as needed.
```
