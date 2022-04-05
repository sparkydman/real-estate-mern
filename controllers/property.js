const mongoose = require('mongoose');
const Property = require('../models/Property.js');
const User = require('../models/User.js');
const ErrorRes = require('../utils/ErrorRes.js');
const { mailHandler } = require('../utils/mail.js');
const setQueryOptions = require('../utils/setQueryOption.js');
const {
  asyncForEach,
  destroyImage,
  uploadImgToCloudinary,
  waitFor,
} = require('../utils/uploadFile.js');



// Delete property
// Authorization private
// Role agent(owner) and admin
const deleteProperty = async (req, res) => {
  const property = await Property.findOne({ _id: req.property._id });

  // Send email to the agent if the property was deleted by admin
  const { email, firstname, lastname } = await User.findOne({
    _id: property.agent,
  }).select('email firstname lastname');
  if (req.user.role === 'admin') {
    const mailBody = {
      from: process.env.FROM_NAME,
      to: email,
      subject: 'Review delete',
      html: `<div style="text-align:center"><p><strong>${firstname} ${lastname} </strong> The property ${req.property.title} was deleted due to some of it's content violet our <a href='${process.env.WEBSITE_URL}/policies' target='_black'>policies </a> </p></div>`,
    };
    mailHandler(mailBody);
  }
  await property.remove();
  res.status(200).json({
    success: true,
    data: 'deleted',
  });
};

const purchaseProperty = async (req, res) => {
  // Check if the property exist
  if (!req.property) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Property not found', null, 404),
    });
  }
  if (req.property.sold) {
    return res.status(400).json({
      success: false,
      error: new ErrorRes('Property already sold', null, 400),
    });
  }

  // Update the property
  const property = await Property.findOneAndUpdate(
    { _id: req.property._id },
    { $set: { sold: true }, $push: { purchasedBy: { client: req.user._id } } },
    { new: true }
  );

  //  Send email to the agent
  const { email } = await User.findOne({
    _id: property.agent,
  }).select('email');

  const agentMailBody = {
    from: process.env.FROM_NAME,
    to: email,
    subject: 'Property purchased',
    text: `The property (${req.property.title}) that you uploaded was purchase by ${req.user.firstname} ${req.user.lastname}`,
  };
  mailHandler(agentMailBody);

  // Send email to the customer
  const customerMailBody = {
    from: process.env.FROM_NAME,
    to: req.user.email,
    subject: 'Property purchase successful',
    text: `The purchase for property (${req.property.title}) was successful`,
  };
  mailHandler(customerMailBody);

  res.status(200).json({
    success: true,
    data: property,
  });
};

const getAllPropertiesByAgent = async (req, res) => {
  const profile = await User.findOne({ _id: req.params.id });
  if (!profile) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('User not found', null, 404),
    });
  }
  if (profile.role !== 'agent') {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Agent not found', null, 404),
    });
  }
  const properties = await Property.find({ agent: profile._id }).sort({
    createdAt: 'desc',
  });
  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  });
};

const getAllPropertiesSoldByAgent = async (req, res) => {
  const profile = await User.findOne({ _id: req.params.id });
  if (!profile) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('User not found', null, 404),
    });
  }
  if (profile.role !== 'agent') {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Agent not found', null, 404),
    });
  }
  const properties = await Property.find({
    agent: profile._id,
    sold: true,
  }).sort({
    createdAt: 'desc',
  });
  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  });
};

const authorizeProperty = (req, res, next) => {
  if (!req.property) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Property not found', null, 404),
    });
  }
  if (req.user.role !== 'admin' && !req.isPropertyAgent) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes('Unauthorized', null, 401),
    });
  }
  next();
};

module.exports = {
  authorizeProperty,
  getAllProperties,
  getAllPropertiesByAgent,
  getAllPropertiesSoldByAgent,
  getAllSearchedProperties,
  getPropertyById,
  getSingleProperty,
  addProperty,
  updateProperty,
  purchaseProperty,
  deleteImg,
  deleteProperty,
};
