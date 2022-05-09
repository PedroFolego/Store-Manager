const connection = require('./connection');

const getSalesModel = async () => {
  const [sales] = await connection.execute(
    `SELECT sa.id as saleId, sa.date AS date, sp.product_id AS productId, sp.quantity AS quantity
      FROM StoreManager.sales sa
      JOIN StoreManager.sales_products sp ON sa.id = sp.sale_id`,
  );
  return sales;
};

const getSaleIDModel = async (id) => {
  const [sale] = await connection.execute(
    `SELECT sa.date AS date, sp.product_id AS productId, sp.quantity AS quantity
      FROM StoreManager.sales sa
      JOIN StoreManager.sales_products sp ON sa.id = sp.sale_id
      where sa.id=?;`,
    [id],
  );
  return sale;
};

const postSaleModel = async (productID, quantity) => {
  const sale = await connection.execute(
    `INSERT INTO StoreManager.sales_products`
  )
}

module.exports = {
  getSalesModel,
  getSaleIDModel,
};
