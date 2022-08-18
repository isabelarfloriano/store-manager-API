const { salesSchema } = require('./salesSchema');

const salesValidation = (req, res, next) => {
  const sales = [...req.body];

  sales.forEach((element) => {
    const { error } = salesSchema.validate(element);
    console.log('erro salevalidation', error);
    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(Number(code)).json({ message });
    }
  });
    
  next();
};

module.exports = { salesValidation };