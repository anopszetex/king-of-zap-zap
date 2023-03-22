class AppError extends Error {
  constructor(message, context) {
    super(message);
    this.context = context;
  }

  static build(message, context) {
    return new AppError(message, context);
  }
}

module.exports = { AppError };
