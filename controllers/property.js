import mongoose from 'mongoose';
import Property from '../models/Property.js';
import User from '../models/User.js';
import ErrorRes from '../utils/ErrorRes.js';
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
  if (req.body.keywords) {
    req.body.keywords = req.body.keywords
      .split(',')
      .map((word) => word.toLowerCase())
      .join(',');
  }
  if (req.user.role === 'admin' && !req.body.agent) {
    return res.status(400).json({
      success: false,
      error: new ErrorRes(
        'Admin required to provide the agent for the property',
        'agent',
        400
      ),
    });
  }

  if (req.user.role === 'agent') {
    req.body.agent = req.user._id;
  }

  const isTitle = await Property.findOne({ title: req.body.title });
  if (isTitle) {
    return res.status(400).json({
      success: false,
      error: new ErrorRes('The title is already registered', 'title', 400),
    });
  }

  const property = new Property(req.body);
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
  const property = await Property.findOne({ _id: id })
    .populate('agent', '_id firstname lastname avatar')
    .populate('purchasedBy.client', '_id firstname lastname avatar')
    .populate('reviews', '_id text user');

  if (!property) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Property not found', null, 404),
    });
  }
  req.property = property;
  const agentId = mongoose.Types.ObjectId(req.property.agent._id);
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
export const getAllProperties = async (req, res) =>
  res.status(200).json(res.queryResults);

export const getAllSearchedProperties = async (req, res) => {
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
  const properties = await Property.find({ ...keywords });

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  });
};

// Get single property
// Authorization public
export const getSingleProperty = async (req, res) => {
  const property = await Property.findOne({ _id: req.params.id })
    .populate('agent', '_id firstname lastname avatar')
    .populate('purchasedBy.client', '_id firstname lastname avatar')
    .populate('reviews', '_id text user');

  if (!property) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Property not found', null, 404),
    });
  }
  res.status(200).json({
    success: true,
    data: property,
  });
};

// Update property
// Authorization private
// Role agent(owner) and admin
export const updateProperty = async (req, res) => {
  if (req.user.role !== 'admin' && req.body.enable) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes("You can't enable or disable account ", null, 401),
    });
  }

  req.body.images = [];

  if (req.files.length !== 0) {
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

  const property = await Property.findOne(
    { _id: req.property._id },
    { $set: req.body },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    success: true,
    data: property,
  });
};

export const deleteImg = async (req, res) => {
  const property = await Property.findOneAndUpdate(
    { _id: req.property.id },
    { $pull: { images: { _id: req.body.img } } },
    { new: true }
  );

  const imgIndex = property.images.map((img) => img._id).indexOf(req.body.img);

  destroyImage(property.images[imgIndex].url);

  res.status(200).json({
    success: true,
    data: property,
  });
};

// Delete property
// Authorization private
// Role agent(owner) and admin
export const deleteProperty = async (req, res) => {
  const property = await Property.findOneAndDelete({ _id: req.property._id });

  // delete images of the property
  if (property.images !== 0) {
    await asyncForEach(property.images, async (file) => {
      destroyImage(file);
    });
  }
  res.status(200).json({
    success: true,
    data: 'deleted',
  });
};

export const purchaseProperty = async (req, res) => {
  if (!req.property) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Property not found', null, 404),
    });
  }

  const property = await Property.findOneAndUpdate(
    { _id: req.property._id },
    { $set: { sold: true }, $push: { purchasedBy: { client: req.user._id } } },
    { new: true }
  );
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
