const productsSchema = require('./productsSchema');

const isNameValid = (name) => {
  const isValid = productsSchema.validate(name);

  return isValid;
};

const nameValidation = (req, res, next) => {
  const name = { ...req.body };
  const { error } = isNameValid(name);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }

  next();
};

module.exports = { nameValidation };