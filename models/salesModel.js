const connection = require('./connection');

const addSale = async (sales) => {
  const [sold] = await connection.execute(
    'INSERT INTO StoreManager.sales (id, date) VALUES ();',
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

  return sold;
};

module.exports = {
  addSale,
};