import express from 'express';
import catchError from '../utils/catchError';
import { requiredAuth, requiredRole } from '../middleware/auth';
import { addReview } from '../controllers/review';

const route = express.Router();

// ----------REVIEW CRUD -------------

// @route /api/review/
// @method POST
// @authorization Private
// @desc Add review
route.post(
  '/property/:type',
  requiredAuth,
  requiredRole('customer'),
  catchError(addReview)
);

// @route /api/review/
// @method GET
// @authorization Public
// @desc Get all properties
route.get('/', (req, res) => {
  res.send('get all properties');
});

// @route /api/review/:id
// @method GET
// @authorization Public
// @desc Get a single review
route.get('/:id', (req, res) => {
  res.send('get a single review');
});

// @route /api/review/:id
// @method PUT
// @authorization Private
// @desc update a review
route.put('/:id', (req, res) => {
  res.send('update a review');
});

// @route /api/review/:id
// @method DELETE
// @authorization Private
// @desc Delete a review
route.delete('/:id', (req, res) => {
  res.send('delete a review');
});

export default route;
