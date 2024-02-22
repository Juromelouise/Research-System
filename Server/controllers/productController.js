const Product = require("../models/product");
const cloudinary = require("cloudinary");

exports.newProduct = async (req, res) => {
  let image = [];
  if (typeof req.body.images === "string") {
    image.push(req.body.images);
  } else {
    image = req.body.images.flat();
  }

  let imagesLinks = [];

  for (let i = 0; i < image.length; i++) {
    let imageDataUri = image[i];
    try {
      const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
        folder: "products",
        width: 150,
        crop: "scale",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const images = imagesLinks;
  console.log(images)
  const { name, price } = req.body;
  const product = await Product.create({ images, price, name, user: req.user._id });
  if (!product)
    return res.status(400).json({
      success: false,
      message: "Product not created",
    });

  res.status(201).json({
    success: true,
    product,
  });
};

exports.updateProduct = async (req, res, next) => {
  // let product = await Product.findById(req.params.id);

  // if (!product) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "Product not found",
  //   });
  // }
  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }
  // if (images !== undefined) {

  //   for (let i = 0; i < product.images.length; i++) {
  //     const result = await cloudinary.v2.uploader.destroy(
  //       product.images[i].public_id
  //     );
  //   }
  // }
  // let imagesLinks = [];
  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.v2.uploader.upload(images[i], {
  //     folder: "products",
  //   });
  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }
  // req.body.images = imagesLinks;
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
    // useFindandModify: false,
  });

  return res.status(200).json({
    success: true,
    product,
  });
};

exports.getProduct = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

exports.product = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
};

