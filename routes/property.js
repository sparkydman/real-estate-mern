const { Router } = require('express');
const {
  addProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById,
  getSingleProperty,
  updateProperty,
  purchaseProperty,
  getAllPropertiesByAgent,
  getAllPropertiesSoldByAgent,
  authorizeProperty,
  getAllSearchedProperties,
  deleteImg,
} = require('../controllers/property.js');
const { getUserById } = require('../controllers/user.js');
const { requiredAuth, requiredRole } = require('../middleware/auth.js');
const { query } = require('../middleware/query.js');
const catchError = require('../utils/catchError.js');
const Property = require('../models/Property.js');
const { uploadGallery } = require('../middleware/uploadFile.js');

const route = Router();

// ----------PROPERTY CRUD -------------

// get property for every /:id routes
route.param('propertyId', getPropertyById);
route.param('userId', getUserById);

// @route /api/property/
// @method POST, GET
// @desc Create property
route
  .route('/')
  .post(
    requiredAuth,
    requiredRole('agent', 'admin'),
    uploadGallery,
    catchError(addProperty)
  )
  .get(query(Property, ''), catchError(getAllProperties));

route.get(
  '/search/:keywords',
  query(Property, ''),
  catchError(getAllSearchedProperties)
);

// @route /api/property/:id
// @method GET
// @authorization Public
// @desc Get a single property
route.get('/:id', catchError(getSingleProperty));

// @route /api/property/:id
// @method PUT
// @authorization Private
// @desc update a property
route.put(
  '/:propertyId',
  requiredAuth,
  requiredRole('agent', 'admin'),
  authorizeProperty,
  uploadGallery,
  catchError(updateProperty)
);

// @route /api/property/:id
// @method DELETE
// @authorization Private
// @desc Delete a property
route.delete(
  '/:propertyId',
  requiredAuth,
  requiredRole('agent', 'admin'),
  authorizeProperty,
  catchError(deleteProperty)
);

// @route /api/property/purchase/:propertyId
// @method PUT
// @authorization Private
// @desc purchase a property by customer
route.put(
  '/:propertyId/purchase',
  requiredAuth,
  requiredRole('customer'),
  catchError(purchaseProperty)
);

// @route /api/property/agent/:id
// @method GET
// @authorization Public
// @desc get all properties by an agent
route.get('/agent/:id', catchError(getAllPropertiesByAgent));

// @route /api/property/agent/sold/:id
// @method GET
// @authorization Public
// @desc Get all sold properties by an agent
route.get('/agent/:id/sold', catchError(getAllPropertiesSoldByAgent));

route.put(
  '/delete-image/:propertyId',
  requiredAuth,
  requiredRole('admin', 'agent'),
  authorizeProperty,
  catchError(deleteImg)
);

module.exports = route;
