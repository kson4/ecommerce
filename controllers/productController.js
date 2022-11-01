const { StatusCodes } = require("http-status-codes");
const path = require("path");
const Product = require("../models/Product");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with product id: ${productId}`
    );
  }
  res.status(StatusCodes.OK).json({ product });
};
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with product id: ${productId}`
    );
  }
  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with product id: ${productId}`
    );
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "successfully removed product" });
};
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("no file uploaded");
  }
  const img = req.files.image;
  if (!img.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("please upload image");
  }
  const imagePath = path.join(__dirname, `../public/uploads/${img.name}`);
  await img.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${img.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
