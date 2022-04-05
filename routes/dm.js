const express = require('express');
const catchError = require('../utils/catchError.js');
const { requiredAuth } = require('../middleware/auth.js');
const {
  deleteDm,
  getAllDmToAndFrom,
  getDmById,
  postDm,
} = require('../controllers/dm.js');

const route = express.Router();

route.param('dmId', getDmById);

// ----------REVIEW CRUD -------------

// @route /api/dm/
// @method POST
// @authorization Private
// @desc Add Dm
route.post('/:to', requiredAuth, catchError(postDm));

// @route /api/dms/:users
// @method GET
// @authorization Public
// @desc Get all Dms
route.get('/:from', requiredAuth, catchError(getAllDmToAndFrom));

// @route /api/dm/:id
// @method DELETE
// @authorization Private
// @desc Delete a dm
route.delete('/:dmId', requiredAuth, catchError(deleteDm));

// @route /api/dm/like:id
// @method PUT
// @authorization Private
// @desc Like a dm
route.put('/like/:dmId', requiredAuth, catchError());

// @route /api/dm/like:id
// @method PUT
// @authorization Private
// @desc Dislike a dm
route.put('/dislike/:dmId', requiredAuth, catchError());

module.exports = route;
