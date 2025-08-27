/*
 * Licensed under the MIT License. See LICENSE file in the project root for full license text.
 */

import user_image from "./user-image.jpg";
import code_icon from "./code-icon.png";
import code_icon_dark from "./code-icon-dark.png";
import edu_icon from "./edu-icon.png";
import edu_icon_dark from "./edu-icon-dark.png";
import project_icon from "./project-icon.png";
import project_icon_dark from "./project-icon-dark.png";
import logo from "./logo.png";
import logo_dark from "./logo_dark.png";
import mail_icon from "./mail_icon.png";
import mail_icon_dark from "./mail_icon_dark.png";
import hand_icon from "./hand-icon.png";
import moon_icon from "./moon_icon.png";
import sun_icon from "./sun_icon.png";
import arrow_icon from "./arrow-icon.png";
import arrow_icon_dark from "./arrow-icon-dark.png";
import menu_black from "./menu-black.png";
import menu_white from "./menu-white.png";
import close_black from "./close-black.png";
import close_white from "./close-white.png";
import web_icon from "./web_icon.jpeg";
import uni from "./uni.png";
import send_icon from "./send-icon.png";
import sql from "./sql.svg";
import DeskTop from "./DeskTop.png";
import language from "./language.png";
import language_dark from "./language_dark.jpg";

export const assets = {
  user_image,
  code_icon,
  code_icon_dark,
  edu_icon,
  edu_icon_dark,
  project_icon,
  project_icon_dark,
  logo,
  logo_dark,
  mail_icon,
  mail_icon_dark,
  hand_icon,
  moon_icon,
  sun_icon,
  arrow_icon,
  arrow_icon_dark,
  menu_black,
  menu_white,
  close_black,
  close_white,
  web_icon,
  uni,
  send_icon,
  sql,
  DeskTop,
  language,
  language_dark,
};

export const workData = [
  {
    title: "Clinic Management System",
    description: [
      "Smart Clinic Website: A modern web application for managing clinics, built with React, Node.js, and MongoDB.",
      "Tech Stack:",
      "- React: User interfaces for patient, doctor, and admin portals.",
      "- Vite: Fast frontend build tool.",
      "- Tailwind CSS: Modern styling.",
      "- Node.js: Backend runtime.",
      "- Express: RESTful API server.",
      "- MongoDB: Database for storing users, appointments, and files.",
      "- Socket.IO: Real-time chat functionality.",
      "- Cloudinary: Secure file uploads and storage.",
      "- Nodemailer: Email notifications.",
      "- JWT: Secure authentication.",
      "Features:",
      "- Admin Portal: Manage doctors, appointments, and view analytics.",
      "- Doctor Portal: View appointments, upload prescriptions, chat with patients.",
      "- Patient Portal: Book appointments, upload/view medical files, chat with doctors.",
      "- Real-time Chat: Secure messaging between doctors and patients.",
      "- Email Notifications: Automated appointment confirmations and reminders.",
      "- Cloud Storage: Upload and manage medical files securely via Cloudinary.",
      "Usage:",
      "- Admin: Add/edit doctors, oversee appointments, and monitor clinic activity.",
      "- Doctor: Review appointments, upload prescriptions, and communicate with patients.",
      "- Patient: Book appointments, upload/view files, and chat with doctors.",
      "- Chat: Use the built-in chat system for instant communication.",
      "- File Upload: Attach prescriptions and medical documents to appointments.",
    ],
    bgImage: "/work-3-b.png",
    images: [
      "/work-3-6.png",
      "/work-3-2.png",
      "/work-3-3.png",
      "/work-3-4.png",
      "/work-3-5.png",
      "/work-3.png",
      "/work-3-7.png",
      "/work-3-8.png",
    ],
  },
  {
    title: "Chat App",
    description: [
      "A full-stack chat application built with ASP.NET Core (API) and Angular (client).",
      "Features:",
      "- User registration and authentication",
      "- Real-time one-to-one and group messaging",
      "- Group chat creation and management",
      "- Online/offline user status indicators",
      "- Secure password hashing",
      "Tech Stack:",
      "- C#/.NET 9.0",
      "- Databases: Mongodb for messages, Sql for users data",
      "- Angular framework for frontend",
    ],
    bgImage: "/work-2-b.png",
    githubLink: "https://github.com/GOATCHERKI/ChatApp",
    images: ["/work-2.png", "/work-2-2.png", "/work-2-3.png", "/work-2-4.png"],
  },
  {
    title: "Task Manager",
    description: [
      "Tasks Manager: A simple web application for managing tasks, built with Laravel.",
      "Features:",
      "- Create, edit, and delete tasks",
      "- Search tasks by title or description",
      "- Assign order and status to each task",
      "- User-friendly interface",
      "Usage:",
      "- Create Task: Add a new task with title, description, order, and status.",
      "- Edit Task: Update task details.",
      "- Delete Task: Remove a task from the list.",
      "- Search: Use the search bar to filter tasks by title or description.",
    ],
    bgImage: "/work-1-b.png",
    githubLink: "https://github.com/GOATCHERKI/TasksManagerProject",
    images: ["/work-1.png", "/work-1-2.png", "/work-1-3.png", "/work-1-4.png"],
  },
  {
    title: "Store Management System",
    description: [
      "A modern, feature-rich product catalog management system built with Laravel and Cloudinary integration for seamless image handling.",
      "Features:",
      "- Product CRUD Operations: Create, Read, Update, Delete products",
      "- Category Management: Organize products by categories (Phone, Laptop, Desktop)",
      "- Search & Filtering: Search products by name/description and filter by category",
      "- Statistics Dashboard: Real-time product statistics and category counts",
      "- Cloudinary Integration: Professional cloud-based image storage and optimization",
      "- Local Storage Fallback: Automatic fallback to local storage if Cloudinary unavailable",
      "- Drag & Drop Upload: Modern drag-and-drop interface for image uploads",
      "- Image Preview: Real-time preview before upload",
      "- Automatic Cleanup: Removes old images when updating/deleting products",
      "Tech Stack:",
      "- Backend: Laravel 12.x (PHP 8.2+)",
      "- Frontend: Bootstrap 5, FontAwesome 6",
      "- Database: MySQL/SQLite",
      "- Image Storage: Cloudinary + Local Storage",
      "- Package Management: Composer",
    ],
    bgImage: "/work-5-b.png",
    githubLink: "https://github.com/GOATCHERKI/ProductsManager",
    images: [
      "/work-5-4.png",
      "/work-5-2.png",
      "/work-5-3.png",
      "/work-5-1.png",
    ],
  },
  {
    title: "Basketball Lab",
    description: [
      "Basketball Lab is a website that help beginners improve thweir game.",
      "Features:",
      "- 3 levels of training",
      "- professional coaches",
      "- User friendly",
      "Tech Stack:",
      "- HTML, CSS, JS",
    ],
    bgImage: "/work-4-b.png",
    images: [
      "/work-4-4.png",
      "/work-4-2.png",
      "/work-4-3.png",
      "/work-4-1.png",
    ],
    githubLink: "https://github.com/GOATCHERKI/Basketball-Lab",
  },
];

export const experienceData = [
  {
    icon: assets.uni,
    title: "Bsc. in Software Engineering at Altinbas University",
    time: "2021-2025",
    description: "",
  },
  {
    icon: assets.web_icon,
    title: "AI and Cybersecurity Internship at EarTech Information Technology",
    time: "august 2025 - present",
    description: "",
  },
];

export const infoList = [
  {
    icon: assets.code_icon,
    iconDark: assets.code_icon_dark,
    title: "Tech Skills",
    description: "Full-Stack web Dvelopment, learning about AI & Cybersecurity",
  },
  {
    icon: assets.edu_icon,
    iconDark: assets.edu_icon_dark,
    title: "Education",
    description: "Bsc. in Software Engineering",
  },
  {
    icon: assets.language,
    iconDark: assets.language_dark,
    title: "Languages",
    description: "Arabic, English, French, Turkish.",
  },
];