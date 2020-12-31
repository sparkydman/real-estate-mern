import { Types } from 'mongoose';
import Review from '../models/Review';
import ErrorRes from '../utils/ErrorRes';

export const addReview = async (req, res) => {
  req.body.user = req.user.id;

  if (req.url.includes('property') && !req.property) {
    return res.status(404).json({
      success: false,
      error: ErrorRes('Property not found', null, 404),
    });
  }
  const indexOfClient = req.property.purchasedBy
    .map(({ client }) => client._id)
    .indexOf(req.user.id);
  if (indexOfClient === -1) {
    return res.status(401).json({
      success: false,
      error: ErrorRes(
        'You are not authorized to review this property',
        null,
        401
      ),
    });
  } else {
    req.body.property = req.property.id;
  }

  if (req.url.includes('agent') && !req.profile) {
    return res.status(404).json({
      success: false,
      error: ErrorRes('Property not found', null, 404),
    });
  }
  const indexOfAgent = req.profile.properties
    .map(({ agent }) => agent._id)
    .indexOf(req.profile.id);
  if (indexOfAgent === -1) {
    return res.status(401).json({
      success: false,
      error: ErrorRes('You are not authorized to review this agent', null, 401),
    });
  } else {
    req.body.agent = req.profile.id;
  }

  const review = new Review(req.body);
  await review.getReviewType(req.params.type);
  await review.save();
  res.status(200).json({
    success: true,
    data: review,
  });
};

export const getReviewById = async (req, res, next, id) => {
  const review = await Review.findOne({ _id: id });
  if (review) {
    req.review = review;
    const posterId = Types.ObjectId(req.review.user._id);
    if (req.user && posterId.equals(req.user._id)) {
      req.isReviewer = true;
      return next();
    }
  }
  next();
};

export const updateReview = async (req, res) => {
  let id;
  if (!req.review && !(req.user.sole === 'admin' || req.isReviewer)) {
    return res.status(401).json({
      success: false,
      error: ErrorRes('Unauthorized', null, 401),
    });
  }
  id = req.review._id;

  const review = await Review.findOneAndUpdate(
    { _id: id },
    { $set: { text: req.body.text } },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    success: true,
    data: review,
  });
};

export const deleteReview = async (req, res) => {
  let id;
  if (!req.review && !(req.user.sole === 'admin' || req.isReviewer)) {
    return res.status(404).json({
      success: false,
      error: ErrorRes('Unauthorized', null, 404),
    });
  }
  id = req.review._id;

  await Review.findOneAndDelete({ _id: id });
  res.status(200).json({
    success: true,
    data: 'Review deleted',
  });
};

export const likeAndDislikeReview = async (req, res) => {
  if (!req.review) {
    return res.status(404).json({
      success: false,
      error: ErrorRes('Review not found', null, 404),
    });
  }
  const isLiked = req.review.likes.includes(req.user._id);
  const isDisLiked = req.review.dis_likes.includes(req.user._id);
  const review = await Review.findOne({ _id: req.review._id });

  if (req.url.includes('likes') && isLiked) {
    return res.status(409).json({
      success: false,
      error: ErrorRes('You already liked this review'),
    });
  } else {
    if (isDisLiked) {
      await review.dis_likes.pull(req.user._id);
    }
    await review.likes.push(req.user._id);
  }

  if (req.url.includes('dislikes') && isDisLiked) {
    return res.status(409).json({
      success: false,
      error: ErrorRes('You already disliked this review'),
    });
  } else {
    if (isLiked) {
      await review.likes.pull(req.user._id);
    }
    await review.dis_likes.push(req.user._id);
  }

  await review.save();
  return res.status(200).json({
    success: false,
    data: review,
  });
};
