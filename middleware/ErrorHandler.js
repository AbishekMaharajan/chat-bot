const ErrorHandlerMiddleware = (err, _req, res, _next) => {
  const errStatus = err?.statusCode || 500;

  const errMsg = err?.message || "Something went wrong";

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    error: true,
    stack: process.env.NODE_ENV === "development" ? err?.stack : {},
  });
};

export default ErrorHandlerMiddleware;

// type SuccessRes<T> = {
//     message?: string;
//     success: boolean;
//     error: boolean;
//     statusCode?: number;
//     data: T;
//   };

//   const success = <T>(
//     data: T,
//     statusCode: number = 200,
//     message: string = 'Success !'
//   ): SuccessRes<T> => {
//     return {
//       data,
//       error: false,
//       message,
//       statusCode,
//       success: true,
//     };
//   };
//   export default success;
