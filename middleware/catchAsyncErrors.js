const ApiError = require("../errors/ApiError");
exports.catchAsyncErrors = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res)).catch((err) => {
    console.log(err);
    next(ApiError.InternalServerError());
  });
};
