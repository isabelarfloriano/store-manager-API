module.exports = (err, req, res, _next) => {
  const statusByErrorCode = {
    notFound: 404,
  };
  const status = statusByErrorCode[err.code];

  res.status(status).json({ message: err.message });
};