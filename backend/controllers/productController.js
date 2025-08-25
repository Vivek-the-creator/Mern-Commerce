// backend/controllers/productController.js
import Product from '../models/productModel.js'

export const getAllProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products)
}
