const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC;',
  );

  return products;
};

const getById = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?;';
  const [products] = await connection.execute(query, [productId]);

  if (products.length === 0) return null;

  return products;
};

module.exports = {
  getAll,
  getById,
};