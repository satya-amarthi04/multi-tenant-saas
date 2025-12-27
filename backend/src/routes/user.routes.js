const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');


// TEMP test route
router.get('/test', (req, res) => {
  res.json({ message: 'User routes working' });
});

router.get(
  '/tenants/:tenantId/users',
  authMiddleware,
  userController.listTenantUsers
);
router.put('/:userId', authMiddleware, userController.updateUser);
router.delete('/:userId', authMiddleware, userController.deleteUser);



module.exports = router;
