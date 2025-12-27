# System Architecture Document
## Multi-Tenant SaaS Platform – Project & Task Management System

---

## 1. System Architecture Overview

The Multi-Tenant SaaS Platform follows a standard three-tier architecture consisting of a client layer, application layer, and data layer. This architecture ensures scalability, security, and maintainability.

### High-Level Architecture Components

1. **Client (Browser)**
   - Users access the system through a web browser.
   - Supports Super Admin, Tenant Admin, and End Users.
   - Communicates with the frontend application via HTTPS.

2. **Frontend Application (React)**
   - Built using React as a Single Page Application (SPA).
   - Handles UI rendering, form validation, and API communication.
   - Sends authenticated requests to the backend API using JWT tokens.

3. **Backend API Server (Node.js + Express)**
   - Exposes RESTful APIs for authentication, tenant management, users, projects, and tasks.
   - Handles business logic, authorization, and tenant isolation.
   - Validates JWT tokens and user roles using middleware.

4. **Database (PostgreSQL)**
   - Stores all persistent data such as tenants, users, projects, and tasks.
   - Implements multi-tenancy using a shared schema with a `tenant_id` column.
   - Uses indexes on `tenant_id` for performance.

5. **Authentication Flow**
   - User logs in using credentials.
   - Backend validates credentials and generates JWT access token.
   - Token is sent to frontend and stored securely.
   - Token is included in every API request header.

---

## 2. System Architecture Diagram

The high-level architecture diagram illustrates the interaction between the client, frontend, backend, and database.

**Diagram Components to Include:**
- Browser (Client)
- React Frontend
- Backend API Server
- PostgreSQL Database
- JWT Authentication Flow

## 2. System Architecture Diagram

The high-level architecture diagram shows how the client, frontend, backend, and database interact in the system.

 Tool used: draw.io or Lucidchart

 Diagram includes:
- Browser (Client)
- React Frontend
- Node.js Backend API
- PostgreSQL Database
- JWT Authentication Flow

 Saved as:
/system-architecture.png

📌 **Tool suggestion:** draw.io or Lucidchart

---

## 3. Database Schema Design (ER Diagram)

The database follows a relational model with strong tenant isolation using `tenant_id`.

### Key Tables

1. **tenants**
   - id (PK)
   - name
   - subscription_plan
   - created_at

2. **users**
   - id (PK)
   - tenant_id (FK)
   - name
   - email
   - role
   - password_hash

3. **projects**
   - id (PK)
   - tenant_id (FK)
   - name
   - description
   - created_by

4. **tasks**
   - id (PK)
   - tenant_id (FK)
   - project_id (FK)
   - assigned_to
   - status
   - due_date

### Relationships
- One tenant has many users.
- One tenant has many projects.
- One project has many tasks.
- Each task belongs to a tenant and a project.

**Save ER diagram as:**
/images/database-erd.png

 **Highlight:**
- Foreign keys
- Indexes on `tenant_id`

---

## 4. API Architecture

The backend exposes RESTful APIs organized by modules. Authentication and role-based authorization are enforced using middleware.

### Authentication APIs
- POST /auth/register – Public
- POST /auth/login – Public
- POST /auth/logout – Authenticated

---

### Tenant Management APIs
- POST /tenants – Super Admin only
- GET /tenants – Super Admin only
- GET /tenants/:id – Super Admin only

---

### User Management APIs
- POST /users/invite – Tenant Admin
- GET /users – Tenant Admin
- PUT /users/:id/role – Tenant Admin
- DELETE /users/:id – Tenant Admin

---

### Project Management APIs
- POST /projects – Authenticated
- GET /projects – Authenticated
- GET /projects/:id – Authenticated
- PUT /projects/:id – Tenant Admin
- DELETE /projects/:id – Tenant Admin

---

### Task Management APIs
- POST /tasks – Authenticated
- GET /tasks – Authenticated
- GET /tasks/:id – Authenticated
- PUT /tasks/:id – Authenticated
- DELETE /tasks/:id – Tenant Admin

---

## 5. Authentication & Authorization Flow

1. User logs in with email and password.
2. Backend validates credentials.
3. JWT access token is generated.
4. Token is sent to frontend.
5. Frontend sends token in Authorization header.
6. Backend middleware verifies token and role.
7. Request is processed if authorized.

---

## End of Architecture Document




