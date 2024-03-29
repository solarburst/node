export const errorMiddleware = (error, _, res, next) => {
  res.status(error.status || 500);

  res.json({
    type: error.type || "error",
    status: error.status,
    message: error.message,
  });
};
