import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getLoggedUser,
  getSingleUser,
  login,
  register,
  updateProfile,
} from '../controllers/user';
import { requiredAuth, requiredRole } from '../middleware/auth';
import catchError from '../utils/catchError';

const route = express.Router();

// ----------USER CRUD -------------

// @route /api/user/
// @method POST
// @authorization Public
// @desc Add user and lofgin
route.post('/register', catchError(register));
route.post('/login', catchError(login));

// @route /api/user/
// @method GET
// @authorization Public
// @desc Get all properties
route.get('/', catchError(getAllUsers));

// @route /api/user/:id
// @method GET
// @authorization Public
// @desc Get a single user
route.get('/:id', catchError(getSingleUser));
route.get('/profile/:id', requiredAuth, catchError(getLoggedUser));

// @route /api/user/:id
// @method PUT
// @authorization Private
// @desc update user by the loggedin user or the admin
route.put('/profile', requiredAuth, catchError(updateProfile));
route.put(
  '/profile/:id',
  requiredAuth,
  requiredRole('admin'),
  catchError(updateProfile)
);

// @route /api/user/:id
// @method DELETE
// @authorization Private
// @desc Delete user by the loggedin user or the admin
route.delete('/profile', requiredAuth, catchError(deleteUser));
route.delete(
  '/profile/:id',
  requiredAuth,
  requiredRole('admin'),
  catchError(deleteUser)
);

export default route;
