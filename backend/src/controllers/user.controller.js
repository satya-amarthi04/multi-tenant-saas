const userService = require('../services/user.service');

exports.listTenantUsers = async (req, res, next) => {
  try {
    const result = await userService.listTenantUsers(req.user, req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = req.user; // from JWT
    const updateData = req.body;

    const updatedUser = await userService.updateUser(userId, user, updateData);

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUser = req.user;

    const result = await userService.deleteUser(userId, currentUser);

    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    if (error.message === 'Cannot delete yourself' || error.message === 'Unauthorized') {
      return res.status(403).json({ success: false, message: error.message });
    }
    if (error.message === 'User not found') {
      return res.status(404).json({ success: false, message: error.message });
    }
    next(error);
  }
};
