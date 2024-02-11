const Product = require("../models/product");

exports.newProduct = async (req, res) => {
  const { name, price } = req.body;
  const product = await Product.create({ price, name, user: req.user._id });
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

// exports.newProduct = async (req, res, next) => {
//     let images = [];
//     if (typeof req.body.images === "string") {
//       images.push(req.body.images);
//     } else {
//       images = req.body.images;
//     }

//     let imagesLinks = [];

//     for (let i = 0; i < images.length; i++) {
//       let imageDataUri = images[i];
//       // console.log(imageDataUri)
//       try {
//         const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
//           folder: "products",
//           width: 150,
//           crop: "scale",
//         });

//         imagesLinks.push({
//           public_id: result.public_id,
//           url: result.secure_url,
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     req.body.images = imagesLinks;

//     const product = await Product.create(req.body);
//     if (!product)
//       return res.status(400).json({
//         success: false,
//         message: "Product not created",
//       });

//     res.status(201).json({
//       success: true,
//       product,
//     });
//   };
