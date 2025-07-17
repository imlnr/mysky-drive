# MySky Drive Monorepo

A modern cloud drive application with advanced file and folder sharing, built as a monorepo with separate `frontend` (React + Vite + TypeScript) and `backend` (Node.js + Express + MongoDB) projects.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Sharing Feature Overview](#sharing-feature-overview)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

```
/
├── backend/   # Node.js, Express, MongoDB API
├── frontend/  # React, Vite, TypeScript client
```

---

## Features

- User authentication (JWT)
- File and folder management
- **Advanced sharing:**
  - Share with users by email
  - Public links (with optional password & expiration)
  - Granular permissions (read, write, delete, share)
  - Manage/revoke access
- Audit logging, soft deletes, and more

---

## 🌐 Live Demo

- Frontend:[https://skydrive-six.vercel.app/](https://skydrive-six.vercel.app/)
- Backend API: [https://mysky-drive.onrender.com](https://mysky-drive.onrender.com)

## Video Presentation

-- [presentation](https://www.loom.com/share/721b3c2671e4428eb36b3aa9275682c8?sid=6b6c50cc-1551-4a02-8bf9-a47a33d4fd83)

## 📸 Screenshots

#### Landing Page

`/`
<img width="1425" alt="Landing Page" src="https://github.com/user-attachments/assets/1965ec1e-a1e8-4a3f-90e6-346188026e9d" />

#### Login Page

`/login`
<img width="1918" height="860" alt="Image" src="https://github.com/user-attachments/assets/76b3f882-eca6-40e3-b3d3-af40c0e5c7ac" />

#### Mydrive Page

`/mydrive`
<img width="1425" alt="Image" src="https://github.com/user-attachments/assets/6f2e65d2-003c-4c25-9cfa-a5821994baee" />

#### Folder Files Page

`/folder/:id`
<img width="1425" alt="Image" src="https://github.com/user-attachments/assets/6d30c459-a7e9-47d9-a9eb-c3d89fd83939" />

## Getting Started

### Backend Setup

1. `cd backend`
2. `npm install`
3. Create a `.env` file in the `backend` directory with the following dummy values:

   ```env
    PORT=add your port name
    JWT_SECRET=add your jwt secret
    JWT_ISSUER=add your jwt issuer
    JWT_EXPIRATION=your expiration time
    MONGO_URI=your mongodb uri here
    SMTP_PASS=add your smtp pass
    SMTP_USER=add your smtp user
    IMAGEKIT_PUBLIC_KEY=add your key here
    IMAGEKIT_PRIVATE_KEY=add your key here
    IMAGEKIT_URL_ENDPOINT=add your key here
    # Add any other required backend environment variables her
   ```

4. `npm run dev`
5. API runs on `http://localhost:4500`

### Frontend Setup

1. `cd frontend`
2. `npm install`
3. Create a `.env` file in the `frontend` directory with the following dummy values:

   ```env
    VITE_GOOGLE_CLIENT_ID=your_google_client_id
    VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret
    VITE_API_URL=your backend running url
    # Add any other required frontend environment variables here
   ```

4. `npm run dev`
5. App runs on `http://localhost:3000`

---

## Sharing Feature Overview

- Share files/folders with users or via public links
- Set permissions: read, write, delete, share
- Password-protect and/or set expiration for public links
- Manage all shares (view, update, revoke)
- All sharing actions are permission-checked and logged

**See [`backend/SHARING_FEATURE_README.md`](backend/SHARING_FEATURE_README.md) for full details.**

---

## API Documentation

- All endpoints require JWT authentication unless public link
- Key endpoints:
  - `POST /shares/share` — Share with user
  - `POST /shares/public-link` — Create public link
  - `GET /shares/shared-with-me` — Items shared with you
  - `GET /shares/shared-by-me` — Items you shared
  - `PUT /shares/permissions/:shareId` — Update permissions
  - `DELETE /shares/remove/:shareId` — Remove share
  - `POST /shares/access/:publicLink` — Access via public link

**See [`backend/SHARE_API_DOCUMENTATION.md`](backend/SHARE_API_DOCUMENTATION.md) for full API details and example requests/responses.**

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## License

MIT

---

### Notes

- For advanced ESLint/TypeScript setup, see [`frontend/README.md`](frontend/README.md).
- For sharing feature test scripts, see `backend/test-share-api.js`.
