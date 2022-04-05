const express = require('express');
const catchError = require('../utils/catchError.js');
const { requiredAuth, requiredRole } = require('../middleware/auth.js');
const {
  addAgentReview,
  addPropertyReview,
  authorizeReview,
  deleteReview,
  disDikeReview,
  getReviewById,
  getSingleReview,
  likeReview,
  updateReview,
} = require('../controllers/review.js');
const { getPropertyById } = require('../controllers/property.js');
const { getUserById } = require('../controllers/user.js');

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
  catchError(addPropertyReview)
);
route.post(
  '/agent/:userId',
  requiredAuth,
  requiredRole('customer'),
  catchError(addAgentReview)
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
  authorizeReview,
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
  authorizeReview,
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

module.exports = route;
