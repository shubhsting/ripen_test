const ApiError = require("../errors/ApiError");

exports.validateRegisterData = (req, res, next) => {
  try {
    const errors = [];
    const { email } = req.body;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      errors.push({ type: "email", msg: "Please enter a valid mail" });
    }
    if (req.body.phone_number) {
      const { phone_number: phone } = req.body;
      if (phone.length != 10) {
        errors.push({
          type: "phone",
          msg: "Please enter a valid phone number",
        });
      }
    }
    if (errors.length == 0) next();
    else {
      const err = ApiError.BadRequest(errors);
      next(err);
    }
  } catch (err) {
    next(ApiError.InternalServerError());
  }
};
