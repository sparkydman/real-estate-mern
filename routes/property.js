import { Router } from 'express';
import {
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
} from '../controllers/property.js';
import { getUserById } from '../controllers/user.js';
import { requiredAuth, requiredRole } from '../middleware/auth.js';
import { query } from '../middleware/query.js';
import catchError from '../utils/catchError.js';
import Property from '../models/Property.js';
import { uploadGallery } from '../middleware/uploadFile.js';

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
  .get(query(Property, 'reviews'), catchError(getAllProperties));

route.get('/search/:keywords', catchError(getAllSearchedProperties));

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
  authorizeProperty,
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

export default route;
