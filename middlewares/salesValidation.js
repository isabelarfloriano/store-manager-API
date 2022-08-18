const salesSchema = require('./salesSchema');

const salesValidation = (req, res, next) => {
  const sales = [...req.body];

  let message = '';
  let code = '';
  const check = sales.some((sale) => {
    const { error } = salesSchema.validate(sale);
    if (error) {
      const [c, m] = error.message.split('|');
      message = m;
      code = c;
      return true;
    }
    return false;
  });

  if (check) {
    return res.status(Number(code)).json({ message });
  }
  next();
};

module.exports = { salesValidation };