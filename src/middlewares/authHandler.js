const { verifyToken } = require("../lib/jwt");

const authHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    req.params.token = verifyToken(token);
    next();
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
};

const authAdminHandler = async (req, res, next) => {
  token = req.params.token;
  try {
    const role = req.params.token.role;
  if(role != 'admin') {
    throw new Error("Admin credentias are needed");
  }
    next();
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
}; 

module.exports = { authHandler, authAdminHandler };