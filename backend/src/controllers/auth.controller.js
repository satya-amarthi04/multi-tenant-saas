const authService = require('../services/auth.service');

exports.registerTenant = async (req, res) => {
  try {
    const result = await authService.registerTenant(req.body);

    res.status(201).json({
      success: true,
      message: 'Tenant registered successfully',
      data: result
    });
  } 
  catch (error) {
  if (error.message === 'Tenant already exists') {
    return res.status(409).json({
      success: false,
      message: error.message
    });
  }

  res.status(500).json({
    success: false,
    message: 'Server error'
  });
}

};


exports.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

exports.me = async (req, res) => {
  res.json({
    success: true,
    message: 'me endpoint working'
  });
};
