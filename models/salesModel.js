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

module.exports = {
  addSale,
};