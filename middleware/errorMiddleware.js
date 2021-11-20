errorMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err.errors) {
    return res.status(err.code).json({
      msg: err.msg,
      errors: err.errors,
    });
  }
  return res.status(err.code).json({
    msg: err.msg,
  });
};

module.exports = errorMiddleware;
