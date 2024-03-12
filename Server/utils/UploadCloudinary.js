const cloudinary = require("cloudinary");

exports.uploadSingle = async (postImage, folderName) => {
  const result = await cloudinary.v2.uploader.upload(postImage, {
    folder: `OniStem/${folderName}`,
  });

  return {
    public_id: result.public_id,
    url: result.secure_url,
    original_name: postImage.orginalname,
  };
};

exports.uploadMultiple = async (postImages, folderName) => {
  let images = [];
  for (let i = 0; i < postImages.length; i++) {
    let image = postImages[i].path;

    const result = await cloudinary.v2.uploader.upload(image, {
      folder: `OniStem/${folderName}`,
    });
    console.log(postImages[i].originalname);
    images.push({
      public_id: result.public_id,
      url: result.secure_url,
      original_name: postImages[i].originalname,
    });
  }

  return images;
};

exports.destroyUploaded = (imagePublicId) => {
  cloudinary.v2.uploader.destroy(imagePublicId);
  return { del: true };
};
