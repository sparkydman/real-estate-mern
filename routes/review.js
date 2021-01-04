import express from 'express';
import catchError from '../utils/catchError';
import { requiredAuth, requiredRole } from '../middleware/auth';
import {
  addReview,
  deleteReview,
  getReviewById,
  getSingleReview,
  updateReview,
} from '../controllers/review';
import { getPropertyById } from '../controllers/property';
import { getUserById } from '../controllers/user';

const route = express.Router();

route.param('propertyId', getPropertyById);
route.param('userId', getUserById);
route.param('reviewId', getReviewById);

// ----------REVIEW CRUD -------------

// @route /api/review/
// @method POST
// @authorization Private
// @desc Add review
route.post(
  '/property/:propertyId',
  requiredAuth,
  requiredRole('customer'),
  catchError(addReview)
);
route.post(
  '/agent/:userId',
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
route.get('/:reviewId', getSingleReview);

// @route /api/review/:id
// @method PUT
// @authorization Private
// @desc update a review
route.put(
  '/:reviewId',
  requiredAuth,
  requiredRole('customer', 'admin'),
  catchError(updateReview)
);

// @route /api/review/:id
// @method DELETE
// @authorization Private
// @desc Delete a review
route.delete(
  '/:reviewId',
  requiredAuth,
  requiredRole('customer', 'admin'),
  catchError(deleteReview)
);

export default route;
