const Property = require('../../models/Property');
const ErrorRes = require('../../utils/ErrorRes');
const setQueryOption = require('../../utils/setQueryOption');

// Get single property
// Authorization public
module.exports = async (req, res) => {
  // Get a property and populate with agent, purchaseBy and review data
  let role = req.user ? req.user.role : 'customer';
  const queryOptions = setQueryOption(role, req.params.id);
  const property = await Property.findOne(queryOptions);

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
