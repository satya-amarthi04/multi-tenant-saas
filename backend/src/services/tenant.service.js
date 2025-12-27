const pool = require('../config/db');
// Import the user service


class TenantService {
  async getTenantById(tenantId, user) {
    // tenant_admin can only access their own tenant
    if (user.role === 'tenant_admin' && user.tenantId !== tenantId) {
      return null;
    }
    // List all users in a tenant
  


    const result = await pool.query(
      `SELECT id, name, subdomain, status, subscription_plan, created_at
       FROM tenants
       WHERE id = $1`,
      [tenantId]
    );

    if (result.rows.length === 0) return null;

    return result.rows[0];
  }

  async listTenantUsers(tenantId, user) {
    // tenant_admin can only access their own tenant
    if (user.role === 'tenant_admin' && user.tenantId !== tenantId) {
      throw new Error('Unauthorized');
    }

    const result = await pool.query(
      `SELECT id, full_name, email, role, is_active, created_at
       FROM users
       WHERE tenant_id = $1`,
      [tenantId]
    );

    return result.rows; // array of users
  }
}

module.exports = new TenantService();
