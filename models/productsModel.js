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

module.exports = {
  getProductsModel,
  getProdIDModel,
  postProductModel,
};
