import mongoose from 'mongoose';
import Property from '../models/Property';
import ErrorRes from '../utils/ErrorRes';

// Create property
// Authorization private
// Role Agent and Admin
export const addProperty = async (req, res) => {
  req.body.keywords = req.body.keywords
    .split(',')
    .map((word) => word.toLowerCase())
    .join(',');
  if (req.user.role === 'agent') {
    req.body.agent = req.user._id;
  }
  const property = new Property(req.body);
  const isTitle = await Property.findOne({ title: property.title });
  if (isTitle) {
    return res.status(403).json({
      success: false,
      error: new ErrorRes('The title is already registered', 'title', 400),
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
  const property = await Property.findOne({ _id: id });
  if (property) {
    req.property = property;
    const agentId = mongoose.Types.ObjectId(req.property.agent._id);
    if (req.user && req.user._id.equals(agentId)) {
      req.isPropertyAgent = true;
      return next();
    }
  }
  next();
};

// Get all properties
// authorization public
export const getAllProperties = async (req, res) => {
  const properties = await Property.find().sort({ createdAt: 'desc' });

  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties,
  });
};

// Get single property
// Authorization public
export const getSingleProperty = async (req, res) => {
  const property = await Property.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    data: property,
  });
};

// Update property
// Authorization private
// Role agent(owner) and admin
export const updateProperty = async (req, res) => {
  let id;
  if (!req.property && !(req.user.role === 'admin' || req.isPropertyAgent)) {
    return res.status(401).json({
      success: false,
      error: ErrorRes('Unauthorized', null, 401),
    });
  }

  id = req.property._id;

  const property = await Property.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    success: true,
    data: property,
  });
};

// Delete property
// Authorization private
// Role agent(owner) and admin
export const deleteProperty = async (req, res) => {
  let id;
  if (!req.property && !(req.user.role === 'admin' || req.isPropertyAgent)) {
    return res.status(401).json({
      success: false,
      error: ErrorRes('Unauthorized', null, 401),
    });
  }
  id = req.property._id;

  await Property.findOneAndDelete({ _id: id });
  res.status(200).json({
    success: true,
    data: 'deleted',
  });
};

export const purchaseProperty = async (req, res) => {
  if (!req.property) {
    return res.status(404).json({
      success: false,
      error: ErrorRes('Property not found', null, 404),
    });
  }

  const property = await Property.findOneAndUpdate(
    { _id: req.property._id },
    { $set: { sold: true }, $push: { purchasedBy: { client: req.user._id } } },
    { new: true }
  );
  res.status(404).json({
    success: true,
    data: property,
  });
};

export const getAllPropertiesByAgent = async (req, res) => {
  const properties = await Property.find({ agent: req.user._id }).sort({
    createdAt: 'desc',
  });
  res.status(404).json({
    success: true,
    count: properties.length,
    data: properties,
  });
};

export const getAllPropertiesSoldByAgent = async (req, res) => {
  const properties = await Property.find({
    agent: req.user._id,
    sold: true,
  }).sort({
    createdAt: 'desc',
  });
  res.status(404).json({
    success: true,
    count: properties.length,
    data: properties,
  });
};
