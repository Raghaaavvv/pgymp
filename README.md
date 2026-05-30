# PGymP - Smart Gym Management System for PGP

**Team:** Samal & Raghav  
**Level of Achievement:** Apollo 11  
**NUS Orbital 2026**

---

## Motivation

Accessing the PGP gym currently involves a tedious manual process — residents must
carry their matric card, hand it to the security guard, provide their phone number
and room details, then manually sign in and out of a physical logbook. There is no
way to check gym capacity before heading down, and peak hours are completely
unpredictable. PGymP aims to eliminate these inefficiencies by digitalising the
entire gym management process.

---

## Aim

PGymP is a mobile-friendly web application that replaces the manual logbook system
with a seamless digital solution. Residents can check in and out via QR code, view
real-time gym capacity, book equipment in advance, and plan visits around
historically busy periods — all from a single platform.

---

## User Stories

1. As a resident, I want to check in to the gym by scanning a QR code so that I
   don't need to carry my matric card or manually sign a logbook.
2. As a resident, I want to view the real-time gym capacity so that I can decide
   whether to head down.
3. As a resident, I want to book equipment in advance so that I can plan my workout
   without worrying about availability.
4. As a resident, I want to see peak hours data so that I can avoid crowded periods.
5. As an administrator, I want digital check-in records so that I don't have to
   maintain a physical logbook.

---

## Features

### Core Features
| Feature | Description | Status |
|---------|-------------|--------|
| User Authentication | Register and log in as a dorm resident | ✅ Done |
| QR Code Check-In/Out | Scan QR code at gym entrance to check in and out | 🚧 In Progress |
| Real-Time Capacity Tracker | Live display of current gym occupancy | 🚧 In Progress |
| Equipment & Slot Booking | Reserve equipment and time slots in advance | 📋 Planned |

### Extension Features
| Feature | Description | Status |
|---------|-------------|--------|
| Waitlist System | Join queue when gym is full, get notified when slot opens | 📋 Planned |
| Peak Hours Heatmap | Visual heatmap of historically busy times | 📋 Planned |
| Booking Reminders | Automated reminders before booked slots | 📋 Planned |
| Equipment Fault Reporting | Report broken equipment directly in the app | 📋 Planned |

---

## Architecture

### Tech Stack
| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React (JavaScript) | User interface, real-time updates |
| Backend | Spring Boot (Java) | REST API, business logic, authentication |
| Database | PostgreSQL | Persistent storage for users, bookings, logs |
| Real-time | WebSockets/Firebase | Live capacity updates |
| Version Control | Git & GitHub | Collaboration and source control |

### System Architecture Diagram
┌─────────────────────────────────────────────────────┐
│                  React Frontend                      │
│              (localhost:3000 / Vercel)               │
└───────────────────────┬─────────────────────────────┘
│ HTTP REST API (JSON)
▼
┌─────────────────────────────────────────────────────┐
│              Spring Boot Backend                     │
│             (localhost:8080 / Render)                │
│                                                      │
│   AuthController  →  UserService  →  UserRepository │
└───────────────────────┬─────────────────────────────┘
│ JPA/Hibernate
▼
┌─────────────────────────────────────────────────────┐
│               PostgreSQL Database                    │
│                  (Render / Local)                    │
│                                                      │
│                   users table                        │
│     id | matricId | password | checked_in            │
└─────────────────────────────────────────────────────┘

### API Endpoints
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Register new user | `{ matricId, password }` |
| POST | `/api/auth/login` | Login and check in | `{ matricId, password }` |
| POST | `/api/auth/checkOut` | Check out user | `{ userId }` |

### Database Schema
users
├── id (BIGSERIAL, PRIMARY KEY)
├── matricId (VARCHAR, NOT NULL, UNIQUE)
├── password (VARCHAR, NOT NULL)
└── checked_in (BOOLEAN, DEFAULT false)

---

## User Flow
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Scan QR   │────▶│  Login Page │────▶│    Home     │
│   at Gym    │     │             │     │  Dashboard  │
└─────────────┘     └──────┬──────┘     └─────────────┘
│
┌────────────┴────────────┐
▼                         ▼
┌─────────────────┐      ┌─────────────────┐
│  Existing User  │      │    New User     │
│     Login       │      │    Register     │
└────────┬────────┘      └────────┬────────┘
│                         │
└────────────┬────────────┘
▼
┌─────────────────┐
│   Checked In    │
│ Status Updated  │
│  in Database    │
└─────────────────┘

---

## Design Decisions

### Why Spring Boot for the Backend?
Spring Boot provides a robust framework for building REST APIs in Java. Given our
familiarity with Java from CS2030S, it was the natural choice. Its built-in support
for JPA and PostgreSQL also reduces boilerplate code significantly.

### Why React for the Frontend?
React handles real-time UI updates efficiently, which is essential for our
live capacity tracker. Its component-based architecture also makes it easy to
build and maintain individual features like the booking system and heatmap.

### Why PostgreSQL?
PostgreSQL is a reliable relational database that integrates seamlessly with
Spring Boot via JPA/Hibernate. Our data (users, bookings, check-in logs) is
structured and relational, making PostgreSQL a better fit than a NoSQL database.

### Why QR Code Instead of Manual Sign-In?
The QR code system eliminates the need for residents to carry their matric card
and removes the security guard as a bottleneck. A single scan updates the database
automatically, replacing the entire manual logbook process.

### Why Separate Login and Registration?
Keeping login and registration as separate flows allows returning users to check
in quickly without going through registration steps again. This reduces friction
for the majority of users who already have accounts.

---

## Software Engineering Practices

### Agile Development
Development follows a milestone-based Agile approach over 12 weeks, progressively
building from core features to extensions with regular testing and feedback at
each stage.

### Version Control
Git and GitHub are used for version control with a feature branching workflow.
Each team member develops on separate branches and merges through pull requests,
ensuring code review before integration and preventing conflicts.

### Testing Strategy
Unit tests cover individual components and integration tests cover API endpoints.
Comprehensive exception handling addresses edge cases like double check-ins,
invalid credentials, and duplicate matricIds.

---

## Development Timeline

| Milestone | Week | Goals | Status |
|-----------|------|-------|--------|
| Milestone 1 | Week 3 | Technical proof of concept: working authentication, basic capacity tracker, project infrastructure | 🚧 In Progress |
| Milestone 2 | Week 7 | Full prototype: QR check-in, booking system, real-time capacity | 📋 Planned |
| Milestone 3 | Week 12 | Extended system: waitlist, heatmap, reminders, fault reporting | 📋 Planned |

---

## Getting Started (Local Development)

### Prerequisites
- Java 21
- Maven
- PostgreSQL
- Node.js (for frontend)

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/YOUR_matricId/pgymp-backend.git
cd pgymp-backend

# Configure database in src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/pgymp_db
spring.datasource.matricId=postgres
spring.datasource.password=YOUR_PASSWORD

# Run the application
./mvnw spring-boot:run
```

### Frontend Setup
```bash
# Clone the frontend repository
git clone https://github.com/YOUR_matricId/pgymp-frontend.git
cd pgymp-frontend

# Install dependencies
npm install

# Run the application
npm start
```

---

## Team

| Name | Role |
|------|------|
| Raghav | Backend (Spring Boot, PostgreSQL) |
| Samel | Frontend (React) |