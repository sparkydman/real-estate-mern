const Property = require('../../models/Property');
const ErrorRes = require('../../utils/ErrorRes');
const {
  asyncForEach,
  waitFor,
  uploadImgToCloudinary,
} = require('../../utils/uploadFile');

/* Create property
 Authorization private
 Role Agent and Admin
 */

module.exports = async (req, res) => {
  // Get the keywords from the req body and lowercase it
  if (req.body.keywords) {
    req.body.keywords = req.body.keywords
      .split(',')
      .map((word) => word.toLowerCase())
      .join(',');
  }
  if (req.user.role === 'admin' && !req.body.agent) {
    // Return error if the admin forgot to add the agent of the property
    return res.status(400).json({
      success: false,
      error: new ErrorRes(
        'Admin required to provide the agent for the property',
        'agent',
        400
      ),
    });
  }

  // Set the property agent as the logged in user
  if (req.user.role === 'agent') {
    req.body.agent = req.user._id;
  }

  // Check if the title is already the database
  const isTitle = await Property.findOne({
    title: req.body.title,
    enable: true,
  });
  if (isTitle) {
    return res.status(400).json({
      success: false,
      error: new ErrorRes('The title is already registered', 'title', 400),
    });
  }

  const property = new Property(req.body);
  // Upload the property images if any
  if (req.files.length !== 0) {
    await asyncForEach(req.files, async (file) => {
      await waitFor(50);
      const result = await uploadImgToCloudinary(file, null, 500, 300);
      property.images.push({
        url: result.url,
        size: result.bytes,
        width: result.width,
        height: result.height,
      });
    });
    property.cover = property.images[0];
  }

  await property.save();

  res.json({
    success: true,
    data: property,
  });
};
