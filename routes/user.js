import express from 'express';
import {
  authenticate,
  changeEmail,
  changePassword,
  deleteUser,
  getAllUsers,
  getLoggedUser,
  getSingleUser,
  getUserById,
  login,
  logout,
  register,
  updateProfile,
} from '../controllers/user';
import { requiredAuth } from '../middleware/auth';
import catchError from '../utils/catchError';

const route = express.Router();

// ----------USER CRUD -------------

route.get('/logout', logout);

route.param('userId', getUserById);

route.post('/register', catchError(register));
route.post('/login', catchError(login));

route.get('/', catchError(getAllUsers));

route.get('/profile', requiredAuth, catchError(getLoggedUser));
route.get('/:id', catchError(getSingleUser));

route
  .route('/profile/:userId')
  .put(requiredAuth, authenticate, catchError(updateProfile))
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

export default route;
