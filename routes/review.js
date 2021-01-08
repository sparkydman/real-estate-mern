import express from 'express';
import catchError from '../utils/catchError.js';
import { requiredAuth, requiredRole } from '../middleware/auth.js';
import {
  addReview,
  deleteReview,
  disDikeReview,
  getReviewById,
  getSingleReview,
  likeReview,
  updateReview,
} from '../controllers/review.js';
import { getPropertyById } from '../controllers/property.js';
import { getUserById } from '../controllers/user.js';

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
route.get('/test', (req, res) => {
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

// @route /api/review/like:id
// @method PUT
// @authorization Private
// @desc Like a review
route.put(
  '/like/:reviewId',
  requiredAuth,
  requiredRole('customer'),
  catchError(likeReview)
);

// @route /api/review/like:id
// @method PUT
// @authorization Private
// @desc Dislike a review
route.put(
  '/dislike/:reviewId',
  requiredAuth,
  requiredRole('customer'),
  catchError(disDikeReview)
);

export default route;
