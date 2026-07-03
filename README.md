# PGymP - Smart Gym Management System for PGP

**Team:** Samal & Raghav
**Level of Achievement:** Apollo 11
**NUS Orbital 2026**

🌐 **Website:** http://pgymp-frontend.s3-website-ap-southeast-1.amazonaws.com/

---

> ## ⚠️ Test Accounts
> Please use the following credentials to test the application:
>
> | Matric ID | Password |
> |-----------|----------|
> | **A1111111A** | **abc** |
> | **A2222222B** | **abc** |

---

## Motivation

Accessing the PGP gym currently involves a tedious manual process — residents must carry their matric card, hand it to the security guard, provide their phone number and room details, then manually sign in and out of a physical logbook. There is no way to check gym capacity before heading down, and peak hours are completely unpredictable. PGymP aims to eliminate these inefficiencies by digitalising the entire gym management process.

---

## Aim

PGymP is a mobile-friendly web application that replaces the manual logbook system with a seamless digital solution. Residents can check in and out via QR code, view real-time gym capacity, check equipment availability, and submit feedback — all from a single platform.

---

## User Stories

1. As a resident, I want to check in to the gym by scanning a QR code so that I don't need to carry my matric card or manually sign a logbook.
2. As a resident, I want to view the real-time gym capacity so that I can decide whether to head down.
3. As a resident, I want to see equipment availability so that I can plan my workout around available machines.
4. As a resident, I want to select which equipment I plan to use so that others can see equipment demand.
5. As a resident, I want to submit feedback so that gym management can improve the facility.
6. As an administrator, I want digital check-in records so that I don't have to maintain a physical logbook.

---

## Features

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| User Authentication | Log in as a dorm resident using Matric ID and password | ✅ Done |
| QR Code Check-In/Out | Unique QR code generated per user for check-in and check-out at security desk | ✅ Done |
| Real-Time Capacity Tracker | Live display of current gym occupancy as a percentage, updates every 10 seconds | ✅ Done |
| Equipment Availability | Displays available count for each equipment based on user preferences | ✅ Done |
| Feedback Page | Residents can submit feedback directly through the app | ✅ Done |
| Equipment & Slot Booking | Reserve equipment and time slots in advance | ✅ Done |

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
| Frontend | React (JavaScript) + Vite | User interface, real-time updates |
| Backend | Spring Boot (Java) | REST API, business logic, authentication |
| Database | PostgreSQL | Persistent storage for users, bookings, logs |
| Deployment | AWS (S3, Elastic Beanstalk, RDS) | Cloud hosting |
| Version Control | Git & GitHub | Collaboration and source control |

### System Architecture

```
+--------------------------------------------------+
|              React Frontend                       |
|              (AWS S3)                             |
+--------------------------------------------------+
                      |
                      | HTTP REST API (JSON)
                      |
                      v
+--------------------------------------------------+
|           Spring Boot Backend                     |
|         (AWS Elastic Beanstalk)                   |
|                                                   |
|  AuthController -> UserService -> UserRepository  |
+--------------------------------------------------+
                      |
                      | JPA / Hibernate
                      |
                      v
+--------------------------------------------------+
|            PostgreSQL Database                    |
|              (AWS RDS)                            |
|                                                   |
|   id | matric_id | password | checked_in          |
+--------------------------------------------------+
```

### API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/auth/login` | Authenticate user and return token | `{ matricId, password }` |
| POST | `/api/auth/checkOut` | Check out user from gym | `{ userId }` |
| GET | `/api/auth/capacity` | Get current gym occupancy count | None |

### Database Schema

| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGSERIAL | PRIMARY KEY, AUTO INCREMENT |
| matric_id | VARCHAR | NOT NULL, UNIQUE |
| password | VARCHAR | NOT NULL |
| checked_in | BOOLEAN | NOT NULL, DEFAULT false |
| last_checked_in | TIMESTAMP | NULLABLE |

---

## User Flow

```
+-------------+     +-------------+     +------------------+
|  Scan QR    | --> |  Login Page | --> | Resident Details |
|  at Gym     |     | (Matric ID  |     | (Block, Room,    |
|  Entrance   |     |  Password)  |     |  Phone Number)   |
+-------------+     +-------------+     +--------+---------+
                                                 |
                                                 v
                                        +--------+---------+
                                        | Equipment        |
                                        | Selection        |
                                        | (Checkboxes)     |
                                        +--------+---------+
                                                 |
                                                 v
+------------------+                   +--------+---------+
| Redirected back  |                   | QR Code Page     |
| to Login Page    |                   | (Show QR to      |
+--------+---------+                   |  security guard) |
         ^                             +--------+---------+
         |                                      |
         |                                      v
+--------+---------+                   +--------+---------+
| Backend sets     |                   | Guard scans QR   |
| checked_in=false |                   | checked_in=true  |
| in database      |                   | in database      |
+--------+---------+                   +------------------+
         ^
         |
+--------+---------+
| Click Check Out  |
| Button           |
+------------------+
```

---

## Key Features Explained

### Real-Time Gym Capacity
The capacity tracker displays the current number of gym-goers as a **percentage** (e.g. 43% full) with a visual progress bar. It fetches live data from the backend every 10 seconds automatically, so residents always have an up-to-date picture before heading down.

### Equipment Availability
Each equipment card displays the number available out of the total (e.g. 2/5). This is based on **user preferences** selected during check-in — if an equipment shows 0 available, it means all current users have indicated they plan to use it. This is a **preference indicator**, not a hard restriction — residents can still use the equipment if it is physically free.

### QR Code Check-In/Out
Upon completing the login and registration flow, each user receives a **unique QR code** tied to their account. The security guard scans this QR code at the gym entrance, which triggers the backend to update the user's `checked_in` status. Check-out is done via a button on the home page.

### Feedback Page
Residents can navigate to the Feedback page via the navigation bar and submit written feedback directly through the app. This replaces informal feedback channels and makes it easier for gym management to collect and act on suggestions.

---

## Design Decisions

### Why Spring Boot for the Backend?
Spring Boot provides a robust framework for building REST APIs in Java. Given our familiarity with Java from CS2030S, it was the natural choice. Its built-in support for JPA and PostgreSQL also reduces boilerplate code significantly.

### Why React for the Frontend?
React handles real-time UI updates efficiently, which is essential for our live capacity tracker. Its component-based architecture also makes it easy to build and maintain individual features like the equipment cards and feedback form.

### Why PostgreSQL?
PostgreSQL is a reliable relational database that integrates seamlessly with Spring Boot via JPA/Hibernate. Our data (users, check-in logs) is structured and relational, making PostgreSQL a better fit than a NoSQL database.

### Why QR Code Instead of Manual Sign-In?
The QR code system eliminates the need for residents to carry their matric card and removes the security guard as a bottleneck. A single scan updates the database automatically, replacing the entire manual logbook process.

### Why No Self-Registration?
To maintain security and ensure only authorised PGP residents can access the gym system, user accounts are pre-provisioned by administrators. This prevents unauthorised users from creating accounts and accessing the facility.

### Why AWS for Deployment?
AWS provides a reliable, scalable cloud infrastructure with a free tier suitable for our prototype. We use Elastic Beanstalk for the backend, RDS for the database, and S3 for the frontend — all managed under one platform.

### Why Poll Every 10 Seconds Instead of WebSockets?
For a gym capacity tracker, polling every 10 seconds provides sufficiently real-time data without the added complexity of WebSockets. Residents don't need instant updates — knowing the capacity within 10 seconds is accurate enough to decide whether to head down. WebSockets may be considered for Milestone 3.

---

## Software Engineering Practices

### Agile Development
Development follows a milestone-based Agile approach over 12 weeks, progressively building from core features to extensions with regular testing and feedback at each stage.

### Version Control
Git and GitHub are used for version control with a feature branching workflow. Each team member develops on separate branches and merges through pull requests, ensuring code review before integration and preventing conflicts.

### Testing Strategy
Unit tests cover individual components and integration tests cover API endpoints. Comprehensive exception handling addresses edge cases like double check-ins, invalid credentials, and users who are already checked out.

---

## Development Timeline

| Milestone | Week | Goals | Status |
|-----------|------|-------|--------|
| Milestone 1 | Week 3 | Technical proof of concept: working authentication, check-in/out flow, frontend-backend integration, AWS deployment | ✅ Done |
| Milestone 2 | Week 7 | Full prototype: QR check-in, real-time capacity tracker, equipment availability, feedback page | ✅ Done |
| Milestone 3 | Week 12 | Extended system: waitlist, heatmap, booking reminders, fault reporting | 📋 Planned |

---

## Getting Started (Local Development)

### Prerequisites
- Java 21
- Maven
- PostgreSQL
- Node.js

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Raghaaavvv/pgymp.git
cd pgymp/backend

# Configure database in src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/pgymp_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

# Run the application
./mvnw spring-boot:run
```

### Frontend Setup

```bash
# Navigate to frontend folder
cd pgymp/frontend

# Install dependencies
npm install

# Run the application
npm run dev
```

---

## Team

| Name | Role |
|------|------|
| Raghav | Backend (Spring Boot, PostgreSQL, AWS) |
| Samal | Frontend (React, Vite, AWS S3) |