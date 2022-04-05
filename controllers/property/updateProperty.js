const Property = require('../../models/Property');
const User = require('../../models/User');
const ErrorRes = require('../../utils/ErrorRes');
const { mailHandler } = require('../../utils/mail');
const {
  asyncForEach,
  waitFor,
  uploadImgToCloudinary,
} = require('../../utils/uploadFile');

// Update property
// Authorization private
// Role agent(owner) and admin
module.exports = async (req, res) => {
  // Disable propertyy each time an agent updated the property
  if (req.user.role !== 'admin') {
    req.body.enable = false;
  }
  // Prevent agent from enabling property
  if (req.user.role !== 'admin' && req.body.enable) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes("You can't enable or disable account ", null, 401),
    });
  }

  // Upload all the property images into the cloud if image(s) is available
  req.body.images = [];
  if (req.files && req.files.length !== 0) {
    await asyncForEach(req.files, async (file) => {
      await waitFor(50);
      const result = await uploadImgToCloudinary(file, null, 500, 300);
      req.body.images.push({
        url: result.url,
        size: result.bytes,
        width: result.width,
        height: result.height,
      });
    });
  }

  // Update the property in the database
  const property = await Property.findOneAndUpdate(
    { _id: req.property._id },
    { $set: req.body },
    { runValidators: true, new: true }
  );

  //  Send email to the agent
  const user = await User.findOne({
    _id: property.agent,
  }).select('email');

  if (req.body.enable && req.body.enable === true) {
    const emailBody = {
      from: process.env.FROM_NAME,
      to: user.email,
      subject: 'Property approved',
      text: `The property (${req.property.title}) that you uploaded was aproved successfully`,
    };
    mailHandler(emailBody);
  }

  res.status(200).json({
    success: true,
    data: property,
  });
};
