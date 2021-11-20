const registerHandler = require("./registerHandler");
const errorMiddleware = require("../middleware/errorMiddleware");
const validateRouter = require("./validateRoutes");

exports.expressRoutes = (app) => {
  app.use("/api/auth/register", registerHandler);
  app.use("/api/otp",validateRouter);
  app.get("/api/ping", (req, res) => {
    return res.status(200).json({ msg: "Pong3!!!" });
  });
  app.use(errorMiddleware);
};
