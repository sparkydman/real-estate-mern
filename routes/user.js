import express from 'express';
import {
  authenticate,
  changeEmail,
  changePassword,
  deleteUser,
  forgotPassword,
  getAllSearchedUsers,
  getAllUsers,
  getLoggedUser,
  getSingleUser,
  getUserById,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
} from '../controllers/user.js';
import { requiredAuth } from '../middleware/auth.js';
import catchError from '../utils/catchError.js';
import User from '../models/User.js';
import { query } from '../middleware/query.js';
import { uploadAvatar } from '../middleware/uploadFile.js';

const route = express.Router();

// ----------USER CRUD -------------

route.get('/logout', logout);

route.param('userId', getUserById);

route.post('/register', uploadAvatar, catchError(register));
route.post('/login', catchError(login));

route.get('/', query(User), catchError(getAllUsers));
route.get('/search/:keywords', catchError(getAllSearchedUsers));

route.get('/profile', requiredAuth, catchError(getLoggedUser));
route.get('/:id', catchError(getSingleUser));

route
  .route('/profile/:userId')
  .put(requiredAuth, authenticate, uploadAvatar, catchError(updateProfile))
  .delete(requiredAuth, authenticate, catchError(deleteUser));

route.put(
  '/change-password/:userId',
  requiredAuth,
  authenticate,
  catchError(changePassword)
);

route.put(
  '/change-email/:userId',
  requiredAuth,
  authenticate,
  catchError(changeEmail)
);

route.post('/forgot-password', catchError(forgotPassword));
route.put('/forgot-password/:token', catchError(resetPassword));

export default route;
