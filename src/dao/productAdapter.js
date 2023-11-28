import ProductMaganer from "../class/productManager.js";
import productSchema from "./models/product.model.js";

const productManager = new ProductMaganer();
const flagMongo = true;

export const createProductAdapter = async (product) => {
  if (flagMongo) {
    const newProduct = await productSchema.create(product);
    return newProduct;
  }
  productManager.create(product);
};

export const test = async (queryCriteria, options) => {

  const out = await productSchema.paginate(queryCriteria,options);
  return out;
}

export const getProductByIdAdapter = async (id) => {
  if (flagMongo) {
    const product = await productSchema.findOne({ _id: id });
    return product;
  }

  const product = await productManager.getProductsById(id);
  return product;
};

export const getProductsAdapter = async (limit) => {
  if (flagMongo) {
    if (limit) {
      const products = await productSchema.find({}).limit(limit);
      return products;
    }

    return await productSchema.find({});
  }
 
};

export const updateProductAdapter = async (id, body) => {
  if (flagMongo) {
    await productSchema.updateOne({ _id: id }, { $set: body });
  }

  productManager.update(id, body);
};

export const deleteProductAdapter = async (id) => {
  if (flagMongo) {
    await productSchema.deleteOne({ _id: id });
  }

  productManager.delete(id);
};
