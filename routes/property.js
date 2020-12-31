import express from 'express';
import {
  addProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById,
  getSingleProperty,
  updateProperty,
} from '../controllers/property';
import { requiredAuth, requiredRole } from '../middleware/auth';
import catchError from '../utils/catchError';

const route = express.Router();

// ----------PROPERTY CRUD -------------

// get property for every /:id routes
route.param('/:propertyId', getPropertyById);

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
route.get(
  '/:id',
  requiredAuth,
  requiredRole('agent', 'admin'),
  catchError(getSingleProperty)
);

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

export default route;
