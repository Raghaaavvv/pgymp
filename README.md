# PGymP - Smart Gym Management System for PGP

**Team:** Somal & Raghav
**Level of Achievement:** Apollo 11
**NUS Orbital 2026**

🌐 **Website:** http://pgymp-frontend.s3-website-ap-southeast-1.amazonaws.com/

---

> ## ⚠️ Test Accounts
> You can either **register your own account** using any Matric ID and password, or use one of the pre-seeded test accounts below:
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

PGymP is a mobile-friendly web application that replaces the manual logbook system with a seamless digital solution. Residents can check in and out via QR code, view real-time gym capacity, check equipment availability, join a waitlist when the gym is full, look up which equipment targets which muscle group, and submit feedback — all from a single platform.

---

## User Stories

1. As a resident, I want to check in to the gym by scanning a QR code so that I don't need to carry my matric card or manually sign a logbook.
2. As a resident, I want to view the real-time gym capacity so that I can decide whether to head down.
3. As a resident, I want to see equipment availability so that I can plan my workout around available machines.
4. As a resident, I want to select which equipment I plan to use so that others can see equipment demand.
5. As a resident, I want to join a waitlist if the gym is full so that I'm automatically checked in once a spot opens up.
6. As a resident, I want to look up which equipment targets a specific muscle group so that I can plan an effective workout.
7. As a resident, I want to see peak hours so that I can plan my visits around quieter times.
8. As a resident, I want to submit feedback so that gym management can improve the facility.
9. As an administrator, I want digital check-in records so that I don't have to maintain a physical logbook.

---

## Features

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| User Authentication | Register and log in as a dorm resident using Matric ID and password | ✅ Done |
| QR Code Check-In/Out | Unique QR code generated per user; scanned by security staff as a verification step | ✅ Done |
| Real-Time Capacity Tracker | Live display of current gym occupancy as a percentage, updates every 10 seconds | ✅ Done |
| Equipment Availability | Displays available count for each equipment based on user preferences | ✅ Done |
| Feedback Page | Residents can submit feedback directly through the app | ✅ Done |

### Extension Features

| Feature | Description | Status |
|---------|-------------|--------|
| Waitlist System | Join queue when gym is full, automatically checked in once a spot opens up | ✅ Done |
| Peak Hours Heatmap | Visual heatmap of historically busy times by day and 2-hour time block | ✅ Done |
| Muscle Map | Interactive body diagram showing which exercises and equipment target each muscle group | ✅ Done |
| Booking Reminders | Automated reminders before booked slots | 📋 Planned |
| Equipment Fault Reporting | Report broken equipment directly in the app | ✅ Done |

---

## Architecture

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React (JavaScript) + Vite | User interface, real-time updates |
| Backend | Spring Boot (Java) | REST API, business logic, authentication |
| Database | PostgreSQL | Persistent storage for users, equipment usage, check-in logs |
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
|       |               |                            |
|       |          Qservice (waitlist)                |
|       |          CapacityService                    |
|       |          EquipmentService                    |
|       |          HeatmapService                       |
+--------------------------------------------------+
                      |
                      | JPA / Hibernate
                      |
                      v
+--------------------------------------------------+
|            PostgreSQL Database                    |
|              (AWS RDS)                            |
|                                                   |
|   id | matric_id | password | checked_in | token   |
+--------------------------------------------------+
```

### API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Register a new resident account | `{ matricId, password }` |
| POST | `/api/auth/login` | Authenticate user, check in, return QR token | `{ matricId, password }` |
| POST | `/api/auth/checkOut` | Check out user from gym | `{ userId }` |
| POST | `/api/auth/scan` | Security staff verify a resident's QR token | `{ token }` |
| GET | `/api/auth/capacity` | Get current gym occupancy count | None |
| GET | `/api/auth/equipment` | Get availability for all equipment | None |
| POST | `/api/auth/equipment/checkIn` | Record equipment a user plans to use | `{ userId, equipmentNames }` |
| GET | `/api/auth/equipment/user/{userId}` | Get equipment currently in use by a specific user | None |
| GET | `/api/auth/queueStatus` | Poll a resident's waitlist position | `?matricId=` (query param) |
| POST | `/api/queue/leave` | Leave the waitlist | `{ matricId }` |

### Database Schema

| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGSERIAL | PRIMARY KEY, AUTO INCREMENT |
| matric_id | VARCHAR | NOT NULL, UNIQUE |
| password | VARCHAR | NOT NULL |
| checked_in | BOOLEAN | NOT NULL, DEFAULT false |
| last_checked_in | TIMESTAMP | NULLABLE |
| token | VARCHAR | UNIQUE, generated per check-in for QR verification |

---

## User Flow

```
+-------------+     +-------------+     +------------------+
|  Log in or  | --> |  Login Page | --> | Resident Details |
|  Register   |     | (Matric ID  |     | (Block, Room,    |
|             |     |  Password)  |     |  Phone Number)   |
+-------------+     +-------------+     +--------+---------+
                                                 |
                                                 v
                                        +--------+---------+
                                        | Equipment        |
                                        | Selection        |
                                        | (Checkboxes)     |
                                        +--------+---------+
                                                 |
                        Gym full? --------+------+
                        |                 | No
                        | Yes             v
                        v        +--------+---------+
              +-----------------+| Checked in;       |
              | Join Waitlist,   || capacity and      |
              | auto check-in    || equipment updated |
              | when a slot      |+--------+---------+
              | opens up         |         |
              +------------------+         v
                                   +--------+---------+
                                   | QR Code Page     |
                                   | (shown to        |
                                   |  security staff   |
                                   |  for verification)|
                                   +--------+---------+
                                            |
                                            v
                                   +--------+---------+
                                   | Click Check Out  |
                                   | -> capacity and   |
                                   | equipment freed up |
                                   +------------------+
```

---

## Key Features Explained

### Real-Time Gym Capacity
The capacity tracker displays the current number of gym-goers as a **percentage** (e.g. 43% full) with a visual progress bar. Capacity is updated the moment a resident logs in or checks out, and the frontend polls the backend every 10 seconds so the display always stays current.

### Equipment Availability
Each equipment card displays the number available out of the total (e.g. 2/5). Availability updates the moment a resident selects equipment during check-in and again when they check out. This is a **preference indicator** based on what residents say they plan to use — not a hard restriction — so a resident can still walk over to a machine showing 0 available if it happens to be physically free.

### QR Code Check-In/Out
After completing login, resident details, and equipment selection, each user receives a **unique QR code** tied to a one-time token. The QR code is shown to security staff at the gym entrance, who scan it through the Scanner page. The scan acts as a **verification step**, confirming the resident is a genuine, currently checked-in user — capacity and equipment counts are already updated at login, so the scan does not change any counts itself. Check-out is done via a button on the home page, which frees up both capacity and any equipment the resident had selected.

### Waitlist System
When the gym reaches full capacity, a resident attempting to log in is added to a queue instead of being turned away, and shown their live position. The frontend polls the backend every 10 seconds; as soon as a spot opens up (someone checks out), the next resident in line is automatically checked in and redirected past the login screen without needing to log in again. Residents can also choose to leave the queue at any time.

### Peak Hours Heatmap
The heatmap shows how full the gym typically is, broken down by day of the week and 2-hour time blocks across the gym's opening hours (7am–11pm). The underlying logic records the **timestamp of every check-in**, buckets it into its day and 2-hour window, and computes the average occupancy for that slot across all historical logs. Since the system has only recently started collecting real check-in data, the heatmap currently displays **representative hardcoded data** to demonstrate the intended pattern; as real usage accumulates, this will be replaced with genuine historical averages from the database.

### Muscle Map
An interactive front/back body diagram lets residents hover or tap a muscle group to see recommended exercises and which equipment at PGymP can be used to train it. This helps residents unfamiliar with gym equipment plan an effective workout.

### Feedback Page
Residents can navigate to the Feedback page via the navigation bar and submit written feedback directly through the app. This replaces informal feedback channels and makes it easier for gym management to collect and act on suggestions.

---

## Design Decisions

### Why Spring Boot for the Backend?
Spring Boot provides a robust framework for building REST APIs in Java. Given our familiarity with Java from CS2030S, it was the natural choice. Its built-in support for JPA and PostgreSQL also reduces boilerplate code significantly.

### Why React for the Frontend?
React handles real-time UI updates efficiently, which is essential for our live capacity tracker and waitlist polling. Its component-based architecture also makes it easy to build and maintain individual features like the equipment cards, heatmap, and muscle map.

### Why PostgreSQL?
PostgreSQL is a reliable relational database that integrates seamlessly with Spring Boot via JPA/Hibernate. Our data (users, equipment usage, check-in logs) is structured and relational, making PostgreSQL a better fit than a NoSQL database.

### Why QR Code as a Verification Step, Not the Check-In Trigger?
We considered having the QR scan itself be the moment a resident's status flips to checked in. However, since capacity and equipment counts are what residents rely on to decide whether to head down, we chose to update those counts immediately at login instead. The QR scan then serves as a lightweight verification layer for security staff — confirming a resident holding a live token is genuinely authenticated — without introducing a lag between logging in and being reflected in the live capacity count.

### Why Self-Registration (Revised from Milestone 1)?
In Milestone 1, we assumed accounts would be pre-provisioned by administrators using NUS's resident database. As we don't currently have access to that database for this prototype, we've added a self-registration flow (Matric ID + password) so the system can be tested and demonstrated end-to-end. In a production deployment, this would be replaced with proper NUS SSO or admin-provisioned accounts.

### Why AWS for Deployment?
AWS provides a reliable, scalable cloud infrastructure with a free tier suitable for our prototype. We use Elastic Beanstalk for the backend, RDS for the database, and S3 for the frontend — all managed under one platform.

### Why Poll Every 10 Seconds Instead of WebSockets?
For a gym capacity tracker and waitlist, polling every 10 seconds provides sufficiently real-time data without the added complexity of WebSockets. Residents don't need instant updates — knowing the capacity or queue position within 10 seconds is accurate enough. WebSockets may be considered for Milestone 3.

---

## Software Engineering Practices

### Agile Development
Development follows a milestone-based Agile approach over 12 weeks, progressively building from core features to extensions with regular testing and feedback at each stage.

### Version Control
Git and GitHub are used for version control with a feature branching workflow. Each team member develops on separate branches and merges through pull requests, ensuring code review before integration and preventing conflicts.

### Testing Strategy
Unit tests cover individual components (login, check-out, capacity, waitlist) and integration tests cover API endpoints via curl-based test scripts. Comprehensive exception handling addresses edge cases like double check-ins, invalid credentials, users already checked out, and invalid QR tokens.

### User Testing
We conducted informal user testing with **7 students**, having them go through the full flow (register, log in, select equipment, check in via QR verification, check out) on their own devices. Feedback from this round informed UI adjustments such as clearer error messages and mobile-friendly layout fixes on the heatmap and equipment cards.

---
## User Testing & Usability Analysis

To evaluate real-world usability and system reliability, we conducted user testing sessions with 7 NUS students using our deployed web application (`pgymp-frontend`). Users completed task scenarios focusing on navigation, QR/scanner check-ins, and monitoring live gym occupancy levels.

### Summary Metrics
* Total Participants: 7 (Computing & Non-Computing undergraduates)
* Task Completion Rate: 100%
* Average Usability Score: 4.6 / 5.0

---

### User Feedback & Action Log

| User Feedback / Issue Reported | Severity | Action Taken / Solution Implemented | Status |
| :--- | :---: | :--- | :---: |
| Page refresh automatically logs out the user session. | High | Implemented session token caching (e.g., LocalStorage/Cookies persistence) to maintain authentication on reload. | ✅ Fixed |
| Individual equipment occupancy updates upon check-in, but total gym capacity status remains static or desynchronized. | High | Refactored the occupancy state logic/backend trigger so that gym capacity dynamically re-renders whenever equipment state changes. | ✅ Fixed |
| Scanner/Camera page requires manual re-permission or loads slowly on mobile devices. | Medium | Optimized scanner component initialization and added graceful error/permission prompts for mobile browsers. | ✅ Fixed |
| Lack of clear guidance or extra workout content after checking in. | Low | Added a planned feature backlog item to integrate workout exercise guides and gym usage tips in future sprints. | 🔄 Backlog |

## Development Timeline

| Milestone | Week | Goals                                                                                                                                                             | Status |
|-----------|------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|
| Milestone 1 | Week 3 | Technical proof of concept: Working authentication, check-in/out flow, frontend-backend integration, AWS deployment                                               | ✅ Done |
| Milestone 2 | Week 7 | Full prototype: QR verification, real-time capacity tracker, equipment availability, waitlist system, peak hours heatmap, muscle map, feedback page, user testing | ✅ Done |
| Milestone 3 | Week 12 | Extended system: Equipment fault reporting, live heatmap data, WebSocket-based real-time updates                                                                  | ✅ Done |

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

