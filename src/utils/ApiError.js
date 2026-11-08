class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message); // Call the parent Error constructor

    this.statusCode = statusCode; // Store HTTP status code
    this.data = null; // Store response data
    this.message = message; // Store error message
    this.success = false; // Error response is unsuccessful
    this.errors = errors; // Store additional errors

    if (stack) {
      this.stack = stack; // Use the provided stack trace
    } else {
      // Automatically capture the stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
