const Product = require("../models/product");
const User = require("../models/user");
const cloudinary = require("cloudinary");
const {
  uploadSingle,
  destroyUploaded,
  uploadMultiple,
} = require("../utils/UploadCloudinary");

exports.newProductUser = async (req, res) => {
  console.log(req.files);
  console.log("B");
  const image = await uploadMultiple(req.files.images, "Onion-type");
  const attachment = await uploadMultiple(req.files.attachment, "Onion-type");
  req.body.user = req.user._id;
  req.body.images = image;
  const product = await Product.create(req.body);

  await User.findByIdAndUpdate(
    req.user._id,
    {
      attachment: attachment,
      role: "seller",
    },
    {
      new: true,
      runValidators: true,
      useFindandModify: false,
    }
  );
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

exports.newProduct = async (req, res) => {
  console.log(req.files);
  console.log("b");
  const image = await uploadMultiple(req.files, "Onion-type");
  req.body.user = req.user._id;
  req.body.images = image;
  const product = await Product.create(req.body);
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
  console.log(req.params.id);
  console.log(req.files);
  let products = await Product.findById(req.params.id);
  for (let i in products.images) {
    await destroyUploaded(products.images[i].public_id);
  }

  const images = await uploadMultiple(req.files, "Onion-type");

  req.body.images = images;
  products = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  return res.status(200).json({
    success: true,
    products,
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
  let products = await Product.findById(req.params.id);
  for (let i in products.images) {
    let del = await destroyUploaded(products.images[i].public_id);
    console.log(del.del);
  }

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

exports.SingleUserProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Product.findById(id);

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.UserProduct = async (req, res) => {
  try {
    if (req.query.fid !== "" && req.query.fid !== "null") {
      const product = await Product.find({ user: req.query.fid });
      console.log(product.length);
      if (product.length === 0) {
        const user = await User.findById({ _id: req.query.fid });
        res.status(200).json({
          product: [],
          success: true,
          user,
        });
      } else {
        const firstProduct = product[0];
        const user = await User.findById(firstProduct.user._id);
        res.status(200).json({
          product,
          success: true,
          user,
        });
      }
    } else if (req.user && req.user._id) {
      const product = await Product.find({ user: req.user._id });
      if (product.length === 0) {
        const user = await User.findById({ _id: req.user.id });
        res.status(200).json({
          product: [],
          success: true,
          user,
        });
      } else {
        const firstProduct = product[0];
        const user = await User.findById(firstProduct.user._id);
        res.status(200).json({
          product,
          success: true,
          user,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "User ID is null.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

exports.adminNewProduct = async (req, res) => {
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

  req.body.images = imagesLinks;
  console.log(req.body);
  const product = await Product.create(req.body);
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
