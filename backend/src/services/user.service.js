const pool = require('../config/db');


class UserService {
  // Fetch all users of a tenant
  async listUsersByTenant(tenantId) {
    const result = await pool.query(
      `SELECT id, full_name, email, role, is_active, created_at
       FROM users
       WHERE tenant_id = $1
       ORDER BY created_at DESC`,
      [tenantId]
    );
    return result.rows;
  }

  // Add this function
  async updateUser(userId, updater, updateData) {
    // Fetch the user to update
    const result = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [userId]
    );
    const user = result.rows[0];

    if (!user) throw new Error('User not found');

    // Only allow update if same tenant
    if (user.tenant_id !== updater.tenantId) {
      throw new Error('Unauthorized');
    }

    // Regular user: can only update own full_name
    if (updater.role !== 'tenant_admin') {
      if (updateData.full_name) user.full_name = updateData.full_name;
      else throw new Error('User can only update their name');
    }

    // Tenant admin: can update role & is_active + full_name
    if (updater.role === 'tenant_admin') {
      if (updateData.full_name) user.full_name = updateData.full_name;
      if (updateData.role) user.role = updateData.role;
      if (updateData.is_active !== undefined) user.is_active = updateData.is_active;
    }

    // Save changes to DB
    await pool.query(
      `UPDATE users SET full_name=$1, role=$2, is_active=$3 WHERE id=$4`,
      [user.full_name, user.role, user.is_active, user.id]
    );

    return {
      full_name: user.full_name,
      role: user.role,
      is_active: user.is_active,
      updated_at: new Date()
    };
  }

  async deleteUser(targetUserId, currentUser) {
    // tenant_admin can only delete users in their own tenant
    const userResult = await pool.query(
      `SELECT id, tenant_id FROM users WHERE id = $1`,
      [targetUserId]
    );

    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }

    const targetUser = userResult.rows[0];

    // Cannot delete self
    if (currentUser.id === targetUser.id) {
      throw new Error('Cannot delete yourself');
    }

    // Only tenant_admin can delete
    if (currentUser.role !== 'tenant_admin') {
      throw new Error('Unauthorized');
    }

    // Verify same tenant
    if (currentUser.tenantId !== targetUser.tenant_id) {
      throw new Error('Cannot delete user from another tenant');
    }

    // Delete user
    await pool.query(`DELETE FROM users WHERE id = $1`, [targetUserId]);

    // TODO: Handle cascade tasks or audit logs if needed

    return { message: 'User deleted successfully' };
  }
}

module.exports = new UserService();