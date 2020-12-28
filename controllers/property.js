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

// Get all properties
// authorization public
export const getAllProperties = async (req, res) => {
  const properties = await Property.find();

  res.status(200).json({
    success: true,
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
  const property = await Property.findOneAndUpdate(
    { _id: req.params.id },
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
  await Property.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({
    success: true,
    data: 'deleted',
  });
};
