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

module.exports = {
  getProductsModel,
  getProdIDModel,
};
