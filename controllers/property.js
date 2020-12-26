import Property from '../models/Property';

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
      msg: 'Property with the title already exist',
    });
  }

  await property.save();
  res.json(property);
};
