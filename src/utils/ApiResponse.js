class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    // HTTP status code
    this.statusCode = statusCode;

    // Response data
    this.data = data;

    // Response message
    this.message = message;

    // Check if response is successful
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
