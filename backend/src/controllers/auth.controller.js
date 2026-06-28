const authService = require("../services/auth.service");

exports.googleLogin = async (req, res) => {
  try {
    const result = await authService.googleLogin(req.body.id_token);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      code: error.code || 500,
      data: null,
      message: error.message || "伺服器內部錯誤。",
    });
  }
};