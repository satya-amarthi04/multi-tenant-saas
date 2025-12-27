-- =========================
-- 1️ Super Admin (no tenant)
-- =========================
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role, is_active)
VALUES
(gen_random_uuid(), NULL, 'superadmin@system.com', '$2b$12$EXAMPLEHASHFORADMIN', 'Super Admin', 'super_admin', TRUE);


-- =========================
-- 2️ Demo Tenant
-- =========================
INSERT INTO tenants (id, name, subdomain, status, subscription_plan, max_users, max_projects)
VALUES
(gen_random_uuid(), 'Demo Company', 'demo', 'active', 'pro', 50, 20);


-- =========================
-- 3️ Tenant Admin for Demo Tenant
-- =========================
-- Get tenant_id for Demo Company
WITH tenant AS (
    SELECT id FROM tenants WHERE subdomain = 'demo'
)
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role, is_active)
SELECT gen_random_uuid(), id, 'admin@demo.com', '$2b$12$EXAMPLEHASHFORDMOADMIN', 'Demo Admin', 'tenant_admin', TRUE
FROM tenant;


-- =========================
-- 4️ Regular Users
-- =========================
WITH tenant AS (
    SELECT id FROM tenants WHERE subdomain = 'demo'
)
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role, is_active)
SELECT gen_random_uuid(), id, 'user1@demo.com', '$2b$12$EXAMPLEHASHUSER1', 'User One', 'user', TRUE
FROM tenant;

WITH tenant AS (
    SELECT id FROM tenants WHERE subdomain = 'demo'
)
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role, is_active)
SELECT gen_random_uuid(), id, 'user2@demo.com', '$2b$12$EXAMPLEHASHUSER2', 'User Two', 'user', TRUE
FROM tenant;


-- =========================
-- 5️ Sample Projects
-- =========================
WITH tenant AS (
    SELECT id FROM tenants WHERE subdomain = 'demo'
), admin AS (
    SELECT id FROM users WHERE email = 'admin@demo.com'
)
INSERT INTO projects (id, tenant_id, name, description, status, created_by)
SELECT gen_random_uuid(), tenant.id, 'Website Redesign', 'Redesign company website', 'active', admin.id
FROM tenant, admin;

WITH tenant AS (
    SELECT id FROM tenants WHERE subdomain = 'demo'
), admin AS (
    SELECT id FROM users WHERE email = 'admin@demo.com'
)
INSERT INTO projects (id, tenant_id, name, description, status, created_by)
SELECT gen_random_uuid(), tenant.id, 'Mobile App', 'Develop mobile app for demo', 'active', admin.id
FROM tenant, admin;


-- =========================
-- 6️ Sample Tasks
-- =========================
WITH project AS (
    SELECT id FROM projects WHERE name = 'Website Redesign'
), tenant AS (
    SELECT id FROM tenants WHERE subdomain = 'demo'
), user1 AS (
    SELECT id FROM users WHERE email = 'user1@demo.com'
)
INSERT INTO tasks (id, project_id, tenant_id, title, description, status, priority, assigned_to)
SELECT gen_random_uuid(), project.id, tenant.id, 'Design Homepage', 'Create homepage design', 'todo', 'high', user1.id
FROM project, tenant, user1;

WITH project AS (
    SELECT id FROM projects WHERE name = 'Website Redesign'
), tenant AS (
    SELECT id FROM tenants WHERE subdomain = 'demo'
), user2 AS (
    SELECT id FROM users WHERE email = 'user2@demo.com'
)
INSERT INTO tasks (id, project_id, tenant_id, title, description, status, priority, assigned_to)
SELECT gen_random_uuid(), project.id, tenant.id, 'Update About Page', 'Revise content on About page', 'in_progress', 'medium', user2.id
FROM project, tenant, user2;

WITH project AS (
    SELECT id FROM projects WHERE name = 'Mobile App'
), tenant AS (
    SELECT id FROM tenants WHERE subdomain = 'demo'
), user1 AS (
    SELECT id FROM users WHERE email = 'user1@demo.com'
)
INSERT INTO tasks (id, project_id, tenant_id, title, description, status, priority, assigned_to)
SELECT gen_random_uuid(), project.id, tenant.id, 'Create Login Screen', 'Develop login UI', 'todo', 'high', user1.id
FROM project, tenant, user1;

WITH project AS (
    SELECT id FROM projects WHERE name = 'Mobile App'
), tenant AS (
    SELECT id FROM tenants WHERE subdomain = 'demo'
), user2 AS (
    SELECT id FROM users WHERE email = 'user2@demo.com'
)
INSERT INTO tasks (id, project_id, tenant_id, title, description, status, priority, assigned_to)
SELECT gen_random_uuid(), project.id, tenant.id, 'Implement Push Notifications', 'Add push notification feature', 'todo', 'medium', user2.id
FROM project, tenant, user2;

WITH project AS (
    SELECT id FROM projects WHERE name = 'Mobile App'
), tenant AS (
    SELECT id FROM tenants WHERE subdomain = 'demo'
)
INSERT INTO tasks (id, project_id, tenant_id, title, description, status, priority)
SELECT gen_random_uuid(), project.id, tenant.id, 'Test App Flow', 'QA testing of all screens', 'todo', 'low'
FROM project, tenant;
