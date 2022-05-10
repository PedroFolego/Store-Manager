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

const addSale = async (id, arrSale) => (
  arrSale.forEach(async ({ productId, quantity }) => (
    connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [id, productId, quantity],
    )
  ))
);

const postSaleModel = async (arrSale) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales (id, date)
      VALUES (DEFAULT, DEFAULT);`,
  );
  await addSale(insertId, arrSale);

  return {
    id: insertId,
    itemsSold: arrSale,
  };
};

const putSaleModel = async (id, arrSale) => {
  await connection.execute(
    `DELETE FROM StoreManager.sales_products 
      WHERE sale_id = ?`,
    [id],
  );
  await addSale(id, arrSale);

  return {
    saleId: id,
    itemUpdated: arrSale,
  };
};

const deleteSaleModel = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.sales_products 
      WHERE sale_id = ?`,
    [id],
  );
  await connection.execute(
    `DELETE FROM StoreManager.sales
      WHERE id = ?`,
    [id],
  );
};

module.exports = {
  getSalesModel,
  getSaleIDModel,
  postSaleModel,
  putSaleModel,
  deleteSaleModel,
};
