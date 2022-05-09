const connection = require('./connection');

const getSalesModel = async () => {
  const [sales] = await connection.execute(
    `SELECT sa.id as saleId, sa.date AS date, sp.product_id AS productId, sp.quantity AS quantity
      FROM StoreManager.sales sa
      JOIN StoreManager.sales_products sp ON sa.id = sp.sale_id`,
  );
  return sales;
};

// select sa.id as saleId, sa.date as date, sp.product_id as productId, sp.quantity as quantity
//     from StoreManager.sales sa
//         join StoreManager.sales_products sp
// distinct sa;

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

module.exports = {
  getSalesModel,
  getSaleIDModel,
};
