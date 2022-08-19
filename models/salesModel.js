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
    `SELECT * FROM StoreManager.sales AS sales
     INNER JOIN StoreManager.sales_products AS sales_products
     WHERE sales.id = sales_products.sale_id
     ORDER BY sale.id ASC, sales_products.product_id ASC`,
  );

  return sales;
};

module.exports = {
  addSale,
  getAll,
};