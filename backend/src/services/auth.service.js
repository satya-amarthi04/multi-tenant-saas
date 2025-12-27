const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');


exports.registerTenant = async ({
  name,
  subdomain,
  adminEmail,
  password,
  fullName
}) => {
  // 1. Check tenant already exists
  const existingTenant = await pool.query(
    'SELECT id FROM tenants WHERE subdomain = $1',
    [subdomain]
  );

  if (existingTenant.rows.length) {
    throw new Error('Tenant already exists');
  }

  // 2. Create tenant
  const tenantResult = await pool.query(
    'INSERT INTO tenants (name, subdomain) VALUES ($1, $2) RETURNING id',
    [name, subdomain]               // ✅ FIX
  );

  const tenantId = tenantResult.rows[0].id;

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Create admin user
  await pool.query(
    `INSERT INTO users 
     (tenant_id, full_name, email, password_hash, role) 
     VALUES ($1, $2, $3, $4, $5)`,
    [
      tenantId,
      fullName,                     // ✅ FIX
      adminEmail,
      hashedPassword,
      'tenant_admin'
    ]
  );

  return { tenantId };
};



exports.login = async ({ email, password, tenantSubdomain }) => {
  const tenant = await pool.query(
    'SELECT * FROM tenants WHERE subdomain = $1',
    [tenantSubdomain]
  );

  if (!tenant.rows.length) throw new Error('Tenant not found');

  const user = await pool.query(
    'SELECT * FROM users WHERE email = $1 AND tenant_id = $2',
    [email, tenant.rows[0].id]
  );

  if (!user.rows.length) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    {
      userId: user.rows[0].id,
      tenantId: tenant.rows[0].id,
      role: user.rows[0].role,
    },
    secret,
    { expiresIn }
  );

  return { token };
};
