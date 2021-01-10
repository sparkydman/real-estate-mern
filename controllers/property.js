import mongoose from 'mongoose';
import Property from '../models/Property.js';
import User from '../models/User.js';
import ErrorRes from '../utils/ErrorRes.js';
import { mailHandler } from '../utils/mail.js';
import { setQueryOptions } from '../utils/setQueryOption.js';
import {
  asyncForEach,
  destroyImage,
  uploadImgToCloudinary,
  waitFor,
} from '../utils/uploadFile.js';

// Create property
// Authorization private
// Role Agent and Admin
export const addProperty = async (req, res) => {
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
  }

  await property.save();

  res.json({
    success: true,
    data: property,
  });
};

// get property by Id
export const getPropertyById = async (req, res, next, id) => {
  // Get the property by the id from the route.param
  let role = req.user ? req.user.role : 'customer';
  const queryOptions = setQueryOptions(role, id);
  const property = await Property.findOne(queryOptions)
    .populate('agent', '_id firstname lastname avatar')
    .populate('purchasedBy.client', '_id firstname lastname avatar')
    .populate('reviews', '_id text user');

  // Check if the property exist
  if (!property) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Property not found', null, 404),
    });
  }
  // set req.property with property
  req.property = property;
  const agentId = mongoose.Types.ObjectId(req.property.agent._id);
  // check if the logged in user is the agent of the of the property and set the req.isPropertyAgent
  if (req.user && req.user._id !== undefined) {
    if (req.user._id.equals(agentId)) {
      req.isPropertyAgent = true;
      return next();
    }
    return next();
  }
  next();
};

// Get all properties
// authorization public
// Return the response from the query middleware
export const getAllProperties = async (req, res) =>
  res.status(200).json(res.queryResults);

export const getAllSearchedProperties = async (req, res) => {
  // Prepare the mongodb search operations in the title,firstname and lastname field
  const keywords = req.params.keywords
    ? {
        $or: [
          {
            title: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            address: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            condition: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            keywords: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            category: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
        ],
      }
    : {};
  // Query the property with keywords options
  const properties = await Property.find({ enable: true, ...keywords });

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  });
};

// Get single property
// Authorization public
export const getSingleProperty = async (req, res) => {
  // Get a property and populate with agent, purchaseBy and review data
  let role = req.user ? req.user.role : 'customer';
  const queryOptions = setQueryOptions(role, req.params.id);
  const property = await Property.findOne(queryOptions)
    .populate('agent', '_id firstname lastname avatar')
    .populate('purchasedBy.client', '_id firstname lastname avatar')
    .populate('reviews', '_id text user');

  // Change if the property exist
  if (!property) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Property not found', null, 404),
    });
  }
  // send response
  res.status(200).json({
    success: true,
    data: property,
  });
};

// Update property
// Authorization private
// Role agent(owner) and admin
export const updateProperty = async (req, res) => {
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

export const deleteImg = async (req, res) => {
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

// Delete property
// Authorization private
// Role agent(owner) and admin
export const deleteProperty = async (req, res) => {
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

export const purchaseProperty = async (req, res) => {
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

export const getAllPropertiesByAgent = async (req, res) => {
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

export const getAllPropertiesSoldByAgent = async (req, res) => {
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

export const authorizeProperty = (req, res, next) => {
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
