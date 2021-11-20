class ApiError {
  constructor(code, msg, errors = undefined) {
    this.code = code;
    this.msg = msg;
    this.errors = errors;
  }

  static InternalServerError() {
    return new ApiError(500, "Internal Server Error");
  }

  static BadRequest(errors) {
    return new ApiError(400, "Bad Request", errors);
  }

  static unauthorizedError() {
    return new ApiError(401, "Not Authorized");
  }
}

module.exports = ApiError;
