const tenantService = require('../services/tenant.service');

exports.getTenantById = async (req, res, next) => {
  try {
    const { tenantId } = req.params;
    const user = req.user;

    const tenant = await tenantService.getTenantById(tenantId, user);

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found'
      });
    }

    res.json({
      success: true,
      data: tenant
    });
  } catch (error) {
    next(error);
  }
};

exports.listTenantUsers = async (req, res, next) => {
  try {
    const { tenantId } = req.params;
    const user = req.user;

    const users = await tenantService.listTenantUsers(tenantId, user);

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};