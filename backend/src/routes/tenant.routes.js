const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const tenantController = require('../controllers/tenant.controller');

// test route (no auth)
router.get('/test', (req, res) => {
  res.json({ message: 'Tenant routes working' });
});

// get tenant by ID (protected)
router.get('/:tenantId', authMiddleware, tenantController.getTenantById);
router.get('/:tenantId/users', authMiddleware, tenantController.listTenantUsers);


module.exports = router;
