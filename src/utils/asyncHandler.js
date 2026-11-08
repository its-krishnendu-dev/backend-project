const asyncHandler = (requestHandler) => {
  // Return Express middleware function
  (req, res, next) => {
    // Convert the request handler result into a Promise
    Promise.resolve(requestHandler(req, res, next))

      // Catch errors and pass them to Express error middleware
      .catch((err) => next(err));
  };
};

export { asyncHandler };


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         // Execute the asynchronous function
//         await fn(req, res, next)
//     } catch (error) {
//         // Pass the error to Express error middleware
//         next(error)
//     }
// }

// export { asyncHandler }
