const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-authorized Access",
          error: err,
        });
      } else {
        // ✅ Ensure req.body exists
        if (!req.body) {
          req.body = {};
        }
        req.body.id = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log("Error in authMiddleware", error);
    res.status(500).send({
      success: false,
      message: "Auth Middleware Error",
      error,
    });
  }
};
