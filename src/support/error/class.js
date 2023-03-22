class AppError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
  }

  /**
   * @param {string} message
   */
  static build(message) {
    return new AppError(message);
  }
}

module.exports = { AppError };
