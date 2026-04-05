# Eventix - Full-Stack Event Booking Platform

Eventix is a full-stack MERN application that allows users to seamlessly browse, register, and pay natively without any third party tools. It features an administrative dashboard for event organizers to create and manage free and paid events. All bookings can be managed manually by an admin to handle payments directly.

## Features
- **User Authentication**: Secure login & registration with JWT and bcrypt.
- **2FA OTP Verification**: 
  - Mandatory Email OTP to activate your account upon Registration (or delayed login attempts).
  - Mandatory Email OTP to finalize and secure event ticket booking.
- **Role-Based Access**: 
  - **Admin**: Create, edit, and delete events. Confirm and reject all incoming booking requests, mark them as 'Paid' or 'Not Paid'. Access is strictly locked to database-flagged users only.
  - **User**: Browse events, submit ticket booking requests via OTP, view personal dashboard pending status, and cancel bookings.
- **Event Management**: Create free and paid events with detailed descriptions, external image URLs, dates, categories, and seating capacity.
- **Smart Booking System**:
  - Mandatory 2FA OTP to authorize a booking request.
  - All booking requests (both free and paid) enter a secure 'Pending' queue for Admin verification.
  - Seat availability accurately updates and securely validates against overbooking logic.
- **Admin Analytics Dashboard**: Track live data such as Pending Requests, Total Revenue, and Total Confirmed Paid Clients directly from the admin panel.
- **Email Notifications**: Automated email delivery upon successful booking confirmation using Nodemailer.
- **Sleek UI/UX**: Built entirely with React, Tailwind CSS, and polished with micro-interactions.

---

## 🚀 Setup Instructions

### Prerequisites
- Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
- You will also need a MongoDB database (e.g., [MongoDB Atlas Free Tier](https://www.mongodb.com/cloud/atlas/register)).

### 1. Environment Variables Configuration
Navigate to `server/.env` and fill in the necessary keys:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecretjwtkey_eventix
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
PORT=5000
NODE_ENV =production
```
> **Note**: For `EMAIL_PASS`, you need to generate an "App Password" from your Google Account settings, standard passwords won't work due to 2FA.

>**Note**: Set ```NODE_ENV=production``` to serve the frontend via the Express server. Set ```NODE_ENV=development``` if running the frontend separately via Vite.


### 2. Production Mode (Single Command)
This project is configured to build the frontend and serve it through the backend for easy hosting.
From the root folder:
```bash
# Install all dependencies and build the frontend
npm run build

# Start the Express server (serves both API and Frontend)
npm run start

```
The application will be available at ```http://localhost:5000```.

### 3. Development Mode (Two Terminals)
If you want to make live changes with Hot Module Replacement (HMR):

**Terminal 1: Backend**
```bash
cd server
npm install
npm run dev
```
Runs on ```http://localhost:5000```

**Terminal 2: Frontend**
```bash
cd client
npm install
npm run dev
```
It will run on a local port provided by Vite, typically ```http://localhost:5173```

## 🔌 API Endpoints Documentation

All API requests are prefixed with `/api`. Authentication is required for most endpoints (JWT required in headers).

### 1. Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|:--- |:--- |:--- |:--- |
| **POST** | `/register` | Register a new user & trigger Email OTP. | Public |
| **POST** | `/login` | User login (returns JWT Token). | Public |
| **POST** | `/verify-otp` | Verify the 2FA OTP sent to email. | Registered |

### 2. Events (`/api/events`)

| Method | Endpoint | Description | Access |
|:--- |:--- |:--- |:--- |
| **GET** | `/` | Fetch all available events. | Public |
| **GET** | `/:id` | Get specific event details. | Public |
| **POST** | `/` | Create a new event (Free/Paid). | Admin Only |
| **PUT** | `/:id` | Update existing event details. | Admin Only |
| **DELETE**| `/:id` | Delete an event from the database. | Admin Only |

### 3. Bookings (`/api/bookings`)

| Method | Endpoint | Description | Access |
|:--- |:--- |:--- |:--- |
| **POST** | `/request` | Submit a booking request (Triggers OTP). | User |
| **GET** | `/my-bookings` | View user's personal booking status. | User |
| **GET** | `/all` | View all pending & confirmed requests. | Admin Only |
| **PATCH**| `/:id/status` | Confirm (Paid) or Reject a booking. | Admin Only |
| **DELETE**| `/:id` | Cancel a booking request. | User/Admin |

---

### 🛡 Authorization Header
For protected routes, include the JWT token in the request header:
`Authorization: Bearer <your_jwt_token>`
