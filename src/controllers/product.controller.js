import createError from "http-errors";
import { Product } from "../models";
import { productSchema } from "../libs/schema.validator";
import { uploadImage } from "../helpers/cloudinary";

export const getProducts = async (req, res) => {
  const products = await Product.find();

  res.json(products);
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, quantity } =
      await productSchema.validateAsync(req.body);

    const productFound = await Product.findOne({ name });
    if (productFound) throw createError.Conflict("Product already exists");

    const result = await uploadImage(req.files.images.tempFilePath);
    const newProduct = new Product({
      name,
      price,
      description,
      quantity,
      images: { url: result.secure_url },
    });

    await newProduct.save();

    res.json(newProduct);
  } catch (error) {
    if (error.isJoi) error.status = 400;
    next(error);
  }
};

export const updateProduct = (req, res) => {
  res.json("update product");
};

export const getProduct = (req, res) => {
  res.json("get product");
};

export const deleteProduct = (req, res) => {
  res.json("delete product");
};
