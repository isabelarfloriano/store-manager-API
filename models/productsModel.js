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

const createProduct = async (name) => { 
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [product] = await connection.execute(query, [name]);

  return { id: product.insertId, name };
};

const updateProduct = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [product] = await connection.execute(query, [name, id]);

  return product;
};

const deleteProduct = async (id) => { 
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
};

const searchProduct = async (search) => {
  const query = 'SELECT * FROM StoreManager.products WHER name LIKE ?';
  const [product] = await connection.execute(query, [`%${search}%`]);

  return product;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};