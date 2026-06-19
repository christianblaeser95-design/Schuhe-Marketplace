const productService = require('./productService');

async function getAllProducts(req, res) {
  try {
    const filters = {
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      size: req.query.size
    };
    const products = await productService.getAllProducts(filters);
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.user.id, req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await productService.updateProduct(req.params.id, req.user.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    await productService.deleteProduct(req.params.id, req.user.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
