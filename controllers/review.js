const mongoose = require('mongoose');
const Review = require('../models/Review.js');
const ErrorRes = require('../utils/ErrorRes.js');
const { mailHandler } = require('../utils/mail.js');

const addPropertyReview = async (req, res) => {
  req.body.user = req.user.id;

  if (!req.property) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Property not found', null, 404),
    });
  }
  const indexOfClient = req.property.purchasedBy
    .map(({ client }) => client.id)
    .indexOf(req.user.id);
  if (indexOfClient === -1) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes(
        'You are not authorized to review this property, since you do not purchase it',
        null,
        401
      ),
    });
  }
  const reviewCount = req.property.reviews
    .map((r) => r.user.id)
    .indexOf(req.user.id);
  if (reviewCount !== -1) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes(
        'You have you have reviewed this property before, Thank you!',
        null,
        401
      ),
    });
  }
  req.body.property = req.property.id;

  const review = new Review(req.body);
  review.agent = undefined;

  await review.save();
  res.status(200).json({
    success: true,
    data: review,
  });
};

const addAgentReview = async (req, res) => {
  req.body.user = req.user.id;

  if (req.profile.role !== undefined && req.profile.role !== 'agent') {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Agent not found', null, 404),
    });
  }

  let wasPartner = false;
  for (let i = 0; i < req.profile.properties.length; i++) {
    for (let j = 0; j < req.profile.properties[i].purchasedBy.length; j++) {
      if (
        req.profile.properties[i].purchasedBy[j].client.toString() ===
        req.user.id
      ) {
        wasPartner = true;
      }
    }
  }

  if (!wasPartner) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes(
        'You have not done anything directly with this agent',
        null,
        401
      ),
    });
  }

  const reviewCount = req.profile.reviews.filter(
    (rev) => rev.user.id === req.user.id
  ).length;

  if (reviewCount >= 1) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes(
        'You have you have reviewed this agent before, Thank you!',
        null,
        401
      ),
    });
  }
  req.body.agent = req.profile.id;

  const review = new Review(req.body);
  review.property = undefined;

  await review.save();
  res.status(200).json({
    success: true,
    data: review,
  });
};

const getReviewById = async (req, res, next, id) => {
  const review = await Review.findOne({ _id: id });
  if (review) {
    req.review = review;
    const posterId = mongoose.Types.ObjectId(req.review.user._id);
    if (req.user && req.user._id !== undefined) {
      if (posterId.equals(req.user._id)) {
        req.isReviewer = true;
        return next();
      }
      return next();
    }
  }
  next();
};
const getSingleReview = async (req, res) => {
  if (!req.review) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Review not found', null, 404),
    });
  }
  res.status(200).json({
    success: true,
    data: req.review,
  });
};

const updateReview = async (req, res) => {
  const review = await Review.findOneAndUpdate(
    { _id: req.review.id },
    { $set: { text: req.body.text } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: review,
  });
};

const deleteReview = async (req, res) => {
  const review = await Review.findOneAndDelete({ _id: req.review.id });

  if (req.user.role === 'admin') {
    const mailBody = {
      from: process.env.FROM_NAME,
      to: req.review.user.email,
      subject: 'Review delete',
      html: `<div style="text-align:center"><p><strong>${req.review.user.firstname} ${req.review.user.lastname} </strong> your review ${review.text} was deleted due to some of it's content violet our <a href='${process.env.WEBSITE_URL}/policies' target='_black'>policies </a> </p></div>`,
    };
    mailHandler(mailBody);
  }
  res.status(200).json({
    success: true,
    data: 'Review deleted',
  });
};

const likeReview = async (req, res) => {
  if (!req.review) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Review not found', null, 404),
    });
  }
  const isLiked = req.review.likes.includes(req.user._id);
  const isDisLiked = req.review.dis_likes.includes(req.user._id);
  const review = await Review.findOne({ _id: req.review._id });

  if (isLiked) {
    return res.status(409).json({
      success: false,
      error: new ErrorRes('You already liked this review'),
    });
  } else {
    if (isDisLiked) {
      await review.dis_likes.pull(req.user._id);
    }
    await review.likes.push(req.user._id);
  }

  await review.save();
  return res.status(200).json({
    success: false,
    data: review,
  });
};

const disDikeReview = async (req, res) => {
  if (!req.review) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Review not found', null, 404),
    });
  }
  const isLiked = req.review.likes.includes(req.user._id);
  const isDisLiked = req.review.dis_likes.includes(req.user._id);
  const review = await Review.findOne({ _id: req.review._id });

  if (isDisLiked) {
    return res.status(409).json({
      success: false,
      error: new ErrorRes('You already disliked this review'),
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

const authorizeReview = (req, res, next) => {
  if (!req.review) {
    return res.status(404).json({
      success: false,
      error: new ErrorRes('Review not found', null, 404),
    });
  }
  if (!req.user.sole !== 'admin' && !req.isReviewer) {
    return res.status(401).json({
      success: false,
      error: new ErrorRes('Unauthorized', null, 401),
    });
  }
  next();
};

module.exports = {
  addAgentReview,
  addPropertyReview,
  deleteReview,
  authorizeReview,
  likeReview,
  disDikeReview,
  updateReview,
  getReviewById,
  getSingleReview,
};
