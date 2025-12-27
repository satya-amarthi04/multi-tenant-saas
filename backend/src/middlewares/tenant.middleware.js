module.exports = (req, res, next) => {
  const { tenantId } = req.params;

  if (req.user.role === 'super_admin') {
    return next();
  }

  if (req.user.tenantId !== tenantId) {
    return res.status(403).json({ message: 'Tenant access denied' });
  }

  next();
};
