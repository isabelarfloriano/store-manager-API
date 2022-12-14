const connection = require('./connection');

const addSale = async (sales) => {
  const [sold] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES ();',
  );

  sales.forEach(async (sale) => {
    await connection.execute(
      `INSERT INTO 
        StoreManager.sales_products (sale_id, product_id, quantity)
       VALUES
        (?,?,?);`,
      [sold.insertId, sale.productId, sale.quantity],
    );    
  });

  return { id: sold.insertId, itemsSold: sales };
};

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT 
      sales.id AS saleId,
      sales.date,
      sales_products.product_id AS productId,
      sales_products.quantity
     FROM StoreManager.sales AS sales
     INNER JOIN StoreManager.sales_products AS sales_products
     WHERE sales.id = sales_products.sale_id
     ORDER BY sales.id ASC, sales_products.product_id ASC`,
  );

  return sales;
};

const getById = async (id) => {
  const query = ` SELECT 
      sales.date,
      sales_products.product_id AS productId,
      sales_products.quantity
     FROM StoreManager.sales AS sales
     INNER JOIN StoreManager.sales_products AS sales_products
     WHERE sales.id = sales_products.sale_id
     AND sales_products.sale_id = ?`;
  
  const [sale] = await connection.execute(query, [id]);

  if (sale.length === 0) return null;

  return sale;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  await connection.execute(query, [id]);
};

const updateSale = async (id, sales) => {
  sales.forEach(async (sale) => {
    await connection.execute(
      `UPDATE 
      StoreManager.sales_products
      SET quantity = ?
      WHERE sale_id = ? AND product_id = ?;`,
      [sale.quantity, id, sale.productId],
    );
  });

  return { saleId: id, itemsUpdated: sales };
};

module.exports = {
  addSale,
  getAll,
  getById,
  deleteSale,
  updateSale,
};