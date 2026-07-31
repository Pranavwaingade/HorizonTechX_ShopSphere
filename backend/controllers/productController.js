import mongoose from "mongoose";
import Product from "../models/Product.js";

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      image,
      description,
      stock,
    } = req.body;

    if (
      !name ||
      !category ||
      price === undefined ||
      !image ||
      !description ||
      stock === undefined
    ) {
      return res.status(400).json({
        message: "All product fields are required",
      });
    }

    const product = await Product.create({
      name,
      category,
      price,
      image,
      description,
      stock,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

export {
  getProducts,
  getProductById,
  createProduct
};