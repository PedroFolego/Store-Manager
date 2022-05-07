const connection = require('./connection');

const getSalesModel = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  return sales;
};

// select sa.id as saleId, sa.date as date, sp.product_id as productId, sp.quantity as quantity
//     from StoreManager.sales sa
//         join StoreManager.sales_products sp
// distinct sa;

const getSaleIDModel = async (id) => {
  const [sale] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE id=?',
    [id],
  );
  return sale;
};

module.exports = {
  getSalesModel,
  getSaleIDModel,
};
