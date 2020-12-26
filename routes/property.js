import express from 'express';
import { addProperty } from '../controllers/property';
import catchErro from '../utils/catchErro';

const route = express.Router();

// ----------PROPERTY CRUD -------------

// @route /api/property/
// @method POST
// @authorization Private
// @desc Add property
route.post('/', catchErro(addProperty));

// @route /api/property/
// @method GET
// @authorization Public
// @desc Get all properties
route.get('/', (req, res) => {
  res.send('get all properties');
});

// @route /api/property/:id
// @method GET
// @authorization Public
// @desc Get a single property
route.get('/:id', (req, res) => {
  res.send('get a single property');
});

// @route /api/property/:id
// @method PUT
// @authorization Private
// @desc update a property
route.put('/:id', (req, res) => {
  res.send('update a property');
});

// @route /api/property/:id
// @method DELETE
// @authorization Private
// @desc Delete a property
route.delete('/:id', (req, res) => {
  res.send('delete a property');
});

export default route;
