PGymP - Smart Gym Management System for PGP
Team: Samal & Raghav
Level of Achievement: Apollo 11
NUS Orbital 2026

Motivation
Accessing the PGP gym currently involves a tedious manual process — residents must carry their matric card, hand it to the security guard, provide their phone number and room details, then manually sign in and out of a physical logbook. There is no way to check gym capacity before heading down, and peak hours are completely unpredictable. PGymP aims to eliminate these inefficiencies by digitalising the entire gym management process.

Aim
PGymP is a mobile-friendly web application that replaces the manual logbook system with a seamless digital solution. Residents can check in and out via QR code, view real-time gym capacity, book equipment in advance, and plan visits around historically busy periods — all from a single platform.

User Stories

As a resident, I want to check in to the gym by scanning a QR code so that I don't need to carry my matric card or manually sign a logbook.
As a resident, I want to view the real-time gym capacity so that I can decide whether to head down.
As a resident, I want to book equipment in advance so that I can plan my workout without worrying about availability.
As a resident, I want to see peak hours data so that I can avoid crowded periods.
As an administrator, I want digital check-in records so that I don't have to maintain a physical logbook.


Features
Core Features
FeatureDescriptionStatusUser AuthenticationLog in as a dorm resident using Matric ID and password✅ DoneQR Code Check-In/OutScan QR code at gym entrance to check in and out✅ DoneReal-Time Capacity TrackerLive display of current gym occupancy🚧 In ProgressEquipment & Slot BookingReserve equipment and time slots in advance📋 Planned
Extension Features
FeatureDescriptionStatusWaitlist SystemJoin queue when gym is full, get notified when slot opens📋 PlannedPeak Hours HeatmapVisual heatmap of historically busy times📋 PlannedBooking RemindersAutomated reminders before booked slots📋 PlannedEquipment Fault ReportingReport broken equipment directly in the app📋 Planned

Architecture
Tech Stack
LayerTechnologyPurposeFrontendReact (JavaScript)User interface, real-time updatesBackendSpring Boot (Java)REST API, business logic, authenticationDatabasePostgreSQLPersistent storage for users, bookings, logsReal-timeWebSockets/FirebaseLive capacity updatesDeploymentAWS (Elastic Beanstalk, RDS, Amplify)Cloud hostingVersion ControlGit & GitHubCollaboration and source control
System Architecture
+--------------------------------------------------+
|              React Frontend                       |
|         (AWS Amplify)                             |
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
API Endpoints
MethodEndpointDescriptionRequest BodyPOST/api/auth/loginLogin and check in{ matricId, password }POST/api/auth/checkOutCheck out user{ userId }
Database Schema
ColumnTypeConstraintsidBIGSERIALPRIMARY KEY, AUTO INCREMENTmatric_idVARCHARNOT NULL, UNIQUEpasswordVARCHARNOT NULLchecked_inBOOLEANNOT NULL, DEFAULT falselast_checked_inTIMESTAMPNULLABLE

User Flow
+-------------+       +-------------+       +------------------+
|  Scan QR    |  -->  |  Login Page |  -->  |   Home Page      |
|  at Gym     |       |             |       |   (QR Code       |
|  Entrance   |       |             |       |    Displayed)    |
+-------------+       +------+------+       +--------+---------+
|                       |
|                       |
v                       v
+--------+--------+     +--------+---------+
| Enter Matric ID |     |  Click Check Out |
| and Password    |     |  Button          |
+--------+--------+     +--------+---------+
|                       |
v                       v
+--------+--------+     +--------+---------+
| Backend checks  |     | Backend sets     |
| credentials and |     | checked_in=false |
| sets            |     | in database      |
| checked_in=true |     +--------+---------+
+--------+--------+              |
|                       v
v              +--------+---------+
+--------+--------+     |  Redirected back |
|  Home Page with |     |  to Login Page   |
|  QR Code shown  |     +------------------+
+-----------------+

Design Decisions
Why Spring Boot for the Backend?
Spring Boot provides a robust framework for building REST APIs in Java. Given our familiarity with Java from CS2030S, it was the natural choice. Its built-in support for JPA and PostgreSQL also reduces boilerplate code significantly.
Why React for the Frontend?
React handles real-time UI updates efficiently, which is essential for our live capacity tracker. Its component-based architecture also makes it easy to build and maintain individual features like the booking system and heatmap.
Why PostgreSQL?
PostgreSQL is a reliable relational database that integrates seamlessly with Spring Boot via JPA/Hibernate. Our data (users, bookings, check-in logs) is structured and relational, making PostgreSQL a better fit than a NoSQL database.
Why QR Code Instead of Manual Sign-In?
The QR code system eliminates the need for residents to carry their matric card and removes the security guard as a bottleneck. A single scan updates the database automatically, replacing the entire manual logbook process.
Why No Self-Registration?
To maintain security and ensure only authorised PGP residents can access the gym system, user accounts are pre-provisioned by administrators. This prevents unauthorised users from creating accounts and accessing the facility.
Why AWS for Deployment?
AWS provides a reliable, scalable cloud infrastructure with a free tier suitable for our prototype. We use Elastic Beanstalk for the backend, RDS for the database, and Amplify for the frontend — all managed under one platform.

Software Engineering Practices
Agile Development
Development follows a milestone-based Agile approach over 12 weeks, progressively building from core features to extensions with regular testing and feedback at each stage.
Version Control
Git and GitHub are used for version control with a feature branching workflow. Each team member develops on separate branches and merges through pull requests, ensuring code review before integration and preventing conflicts.
Testing Strategy
Unit tests cover individual components and integration tests cover API endpoints. Comprehensive exception handling addresses edge cases like double check-ins, invalid credentials, and users who are already checked out.

Development Timeline
MilestoneWeekGoalsStatusMilestone 1Week 3Technical proof of concept: working authentication, check-in/out flow, frontend-backend integration, AWS deployment✅ DoneMilestone 2Week 7Full prototype: QR check-in, booking system, real-time capacity tracker📋 PlannedMilestone 3Week 12Extended system: waitlist, heatmap, booking reminders, fault reporting📋 Planned

Getting Started (Local Development)
Prerequisites

Java 21
Maven
PostgreSQL
Node.js

Backend Setup
bash# Clone the repository
git clone https://github.com/Raghaaavvv/pgymp.git
cd pgymp/backend

# Configure database in src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/pgymp_db
spring.datasource.username=postgres
spring.datasource.password=Srisri123

# Run the application
./mvnw spring-boot:run
Frontend Setup
bash# Navigate to frontend folder
cd pgymp/frontend

# Install dependencies
npm install

# Run the application
npm run dev

Team
NameRoleRaghavBackend (Spring Boot, PostgreSQL, AWS)SamalFrontend (React, Vite)