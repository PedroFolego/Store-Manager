const connection = require('./connection');

const getProductsModel = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const getProdIDModel = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?',
    [id],
  );
  return product;
};

const postProductModel = async (name, quantity) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (name, quantity)
    VALUES (?, ?)`,
    [name, quantity],
  );
  return { id: insertId, name, quantity };
};

const attProductModel = async (id, name, quantity) => {
  await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?, quantity = ?
    WHERE id = ?`,
    [name, quantity, id],
  );
  return { id, name, quantity };
};

const deleteProductModel = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id = ?`,
    [id],
  );
};

module.exports = {
  getProductsModel,
  getProdIDModel,
  postProductModel,
  attProductModel,
  deleteProductModel,
};
