const Property = require('../../models/Property');
const { destroyImage } = require('../../utils/uploadFile');

module.exports = async (req, res) => {
  // Find the image details in the database
  const property = await Property.findOne({ _id: req.property.id });

  // get the index of the image in the database
  const imgIndex = property.images.map((img) => img._id).indexOf(req.body.img);

  // Remove the image from the cloud storage
  destroyImage(property.images[imgIndex].url);

  // Remove the image details from the database
  await property.pull({ images: { _id: req.body.img } });
  await property.save();

  res.status(200).json({
    success: true,
    data: property,
  });
};
