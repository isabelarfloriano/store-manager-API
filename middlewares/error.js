module.exports = (err, req, res, _next) => {
  const statusByErrorCode = {
    notFound: 404,
  };
  const status = statusByErrorCode[err.code];

  // tratamento para erros desconhecidos - Mentoria técnica 18/08 - Guilherme
  if (!status) {
    console.error(err);
    return res.status(500).json({ message: 'S.O.S - Você não tratou isso ainda kkk' });
  }

  return res.status(status).json({ message: err.message });
};