import express from 'express';
import {
  addProperty,
  deleteProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
} from '../controllers/property';
import catchError from '../utils/catchError';

const route = express.Router();

// ----------PROPERTY CRUD -------------

// @route /api/property/
// @method POST, GET
// @desc Create property
route
  .route('/')
  .post(catchError(addProperty))
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
route.put('/:id', catchError(updateProperty));

// @route /api/property/:id
// @method DELETE
// @authorization Private
// @desc Delete a property
route.delete('/:id', catchError(deleteProperty));

export default route;
