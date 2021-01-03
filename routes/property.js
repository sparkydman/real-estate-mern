import express from 'express';
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
} from '../controllers/property';
import { getUserById } from '../controllers/user';
import { requiredAuth, requiredRole } from '../middleware/auth';
import catchError from '../utils/catchError';

const route = express.Router();

// ----------PROPERTY CRUD -------------

// get property for every /:id routes
route.param('propertyId', getPropertyById);
route.param('userId', getUserById);

// @route /api/property/
// @method POST, GET
// @desc Create property
route
  .route('/')
  .post(requiredAuth, requiredRole('agent', 'admin'), catchError(addProperty))
  .get(catchError(getAllProperties));

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
  catchError(deleteProperty)
);

// @route /api/property/purchase/:propertyId
// @method PUT
// @authorization Private
// @desc purchase a property by customer
route.put(
  '/purchase/:propertyId',
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
route.get('/agent/sold/:id', catchError(getAllPropertiesSoldByAgent));

export default route;
