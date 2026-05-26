# 🏥 Med Portal

A full-stack hospital management web application for managing patients and medical staff, built with **React** (frontend) and **Spring Boot** (backend), backed by **PostgreSQL**.

---

## 📁 Project Structure

```
med_portal/
├── frontend/          # React app (Create React App)
│   └── src/
│       ├── App.js
│       ├── Login.jsx
│       ├── Signup.jsx
│       ├── ForgetPassword.jsx
│       ├── RecpHome.jsx
│       ├── DocHome.jsx
│       ├── AddPatient.jsx
│       ├── ViewPatients.jsx
│       ├── EditPatient.jsx
│       ├── DeletePatient.jsx
│       └── ViewDoctor.jsx
└── backend/           # Spring Boot app (Maven)
    └── src/main/java/com/medical/backend/
        ├── controller/
        │   ├── AuthController.java
        │   ├── PatientController.java
        │   └── StaffController.java
        ├── models/
        │   ├── Patient.java
        │   ├── Staff.java
        │   └── OtpCode.java
        ├── repository/
        │   ├── PatientRepository.java
        │   ├── StaffRepository.java
        │   └── OtpCodeRepository.java
        └── service/
            └── OtpService.java
```

---

## ⚙️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, Axios, React Router v6  |
| Backend   | Spring Boot 3.5, Spring Security  |
| Database  | PostgreSQL                        |
| Email     | Spring Mail (Gmail SMTP)          |
| Build     | Maven 3.9, Node.js / npm          |

---

## 🚀 Getting Started

### Prerequisites

- Java 17
- Maven 3.9+
- Node.js 18+ and npm
- PostgreSQL running locally

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE medical_portal;
```

### 2. Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/medical_portal
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password

spring.mail.username=your_gmail@gmail.com
spring.mail.password=your_app_password
```

> **Note:** Use a Gmail App Password (not your regular password). Generate one at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).

### 3. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs at: `http://localhost:8080`

### 4. Run the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔌 API Reference

### Auth (`/api/auth`)

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/register`           | Register a new staff user |
| POST   | `/login`              | Login with email, password, role |
| POST   | `/send-otp`           | Send OTP to email        |
| POST   | `/verify-otp`         | Verify OTP code          |
| POST   | `/reset-password`     | Reset password           |

### Patients (`/api/patients`)

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/all`                | Get all patients         |
| POST   | `/add`                | Add a new patient        |
| PUT    | `/edit/{token}`       | Edit patient details     |
| PUT    | `/status/{token}`     | Update patient status    |

### Staff (`/api/staff`)

| Method | Endpoint                        | Description                    |
|--------|---------------------------------|--------------------------------|
| GET    | `/doctors`                      | Get all doctors                |
| GET    | `/email/{email}`                | Get staff member by email      |
| GET    | `/{doctorId}/patients`          | Get patients for a doctor      |
| PUT    | `/availability/{doctorId}`      | Update doctor availability     |

---

## 👥 Roles & Features

### Receptionist
- View all patients (searchable by token, name, date)
- Add new patients with token, age, issue, assigned doctor, etc.
- Edit patient details
- View all doctors and their availability

### Doctor
- View personal patient list (filtered by their doctor ID)
- Update patient treatment status: *Under Treatment*, *Recovered*, *Treatment Not Given*
- Toggle own availability: *Available* / *Not Available*

---

## 🔐 Authentication Flow

1. User registers with name, email, password, mobile, and role
2. Login validates credentials and role via BCrypt password comparison
3. On success, the email is stored in `localStorage` and the user is redirected to their role-specific home page
4. Forgot password flow: send OTP → verify OTP → reset password

---

## 🗃️ Data Models

### Patient

| Field    | Type      | Notes                        |
|----------|-----------|------------------------------|
| token    | String    | Unique per date              |
| name     | String    |                              |
| age      | Integer   |                              |
| gender   | String    |                              |
| address  | String    |                              |
| issue    | String    |                              |
| doctorId | String    | Assigned doctor              |
| date     | LocalDate |                              |
| marks    | String    | Physical marks/notes         |
| status   | String    | Default: `"Referred"`        |

### Staff (Doctor / Receptionist)

| Field        | Type   | Notes                          |
|--------------|--------|--------------------------------|
| name         | String |                                |
| email        | String | Unique login identifier        |
| password     | String | BCrypt encrypted               |
| mobile       | String |                                |
| role         | String | `doctor` or `receptionist`     |
| doctorId     | String | Doctors only                   |
| specialist   | String | Doctors only                   |
| availability | String | Default: `"not-available"`     |

---

## 🛠️ Build for Production

**Backend JAR:**
```bash
cd backend
mvn clean install
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

**Frontend build:**
```bash
cd frontend
npm run build
```

---

## 📝 Notes

- CORS is configured to allow requests from `http://localhost:3000` only. Update `AppConfig.java` for production deployments.
- OTP codes are stored in the database without expiry — consider adding TTL logic for production use.
- Passwords in `application.properties` (including email credentials) should be externalized via environment variables before deploying.
- The `DeletePatient` feature currently uses a frontend-only confirmation; the backend `DELETE` endpoint is not yet implemented.
