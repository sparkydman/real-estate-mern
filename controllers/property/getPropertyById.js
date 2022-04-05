const mongoose = require('mongoose');
const Property = require('../../models/Property');
const ErrorRes = require('../../utils/ErrorRes');
const setQueryOption = require('../../utils/setQueryOption');

// get property by Id
module.exports = async (req, res, next, id) => {
  // Get the property by the id from the route.param
  let role = req.user ? req.user.role : 'customer';
  const queryOptions = setQueryOption(role, id);
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
