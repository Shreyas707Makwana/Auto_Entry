# 🏠 Hostel Gate Entry System – Auto Entry Using Student ID

This project is a **serverless** student entry/exit management system for hostel gates. Built using **React + Vite** on the frontend and **Supabase** as the backend, the system allows **automated entry by scanning a student ID**. Additional student details are automatically fetched from the Supabase database.

## 🚀 Features

- 🔒 **Auto Entry** with just a **Student ID**
- 📡 Student data (name, branch, room no, etc.) is auto-fetched from the Supabase database
- 🛑 Entry & Exit logs stored securely
- ⚡ **Serverless architecture** using Supabase (PostgreSQL + Auth)
- 🌐 Built with **React + Vite**
- 📱 Fully responsive and mobile-friendly

## 🏗️ Tech Stack

| Layer       | Tech                     |
|-------------|--------------------------|
| Frontend    | React + Vite + Tailwind  |
| Backend     | Supabase (Database + Auth + Edge Functions) |
| Auth        | Supabase Auth            |
| Deployment  | Vercel / Netlify         |

## 📂 Project Structure

```
.
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/ (Supabase integration)
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   └── migrations/ (schema & table setup)
├── .env
├── tailwind.config.js
├── vite.config.ts
└── ...
```

## 🧪 How It Works

1. **User enters Student ID** on the gate system (or it's scanned).
2. App fetches full student info from Supabase using the ID.
3. If valid:
   - Records timestamp and student data as an **Entry/Exit log**
   - Displays a confirmation screen with name and room info.
4. All logs can be reviewed by admins for security tracking.

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
https://github.com/Harshitsoni294/AutoEntry
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

### 4. Run the Dev Server

```bash
npm run dev
```

