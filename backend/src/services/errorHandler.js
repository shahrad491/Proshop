const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.code == 11000 && err.codeName == "DuplicateKey") {
    statusCode = 409;
    message = "Duplicate key error";
  }
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not Found";
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "dev" ? err.stack : "🥞",
  });
};

export { notFound, errorHandler };
