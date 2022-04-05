const express = require('express');
const registerUser = require('../controllers/users/register');
const { requiredAuth, requiredRole } = require('../middleware/auth.js');
const catchError = require('../utils/catchError.js');
const User = require('../models/User.js');
const { query } = require('../middleware/query.js');
const authenticate = require('../middleware/authenticate.js');
const { uploadAvatar } = require('../middleware/uploadFile.js');
const login = require('../controllers/users/login.js');
const logout = require('../controllers/users/logout.js');
const deleteUser = require('../controllers/users/deleteUser.js');
const deleteUserById = require('../controllers/users/deleteUserById.js');
const getUserById = require('../controllers/users/getUserById');
const getAllUsers = require('../controllers/users/getAllUsers');
const getLoggedUser = require('../controllers/users/getLoggedUser');
const getASingleUser = require('../controllers/users/getASingleUser');
const updateProfile = require('../controllers/users/updateProfile');
const changePassword = require('../controllers/users/changePassword');
const resetPassword = require('../controllers/users/resetPassword');
const forgotPassword = require('../controllers/users/forgotPassword');
const changeEmail = require('../controllers/users/changeEmail');

const route = express.Router();

// ----------USER CRUD -------------

route.get('/logout', catchError(logout));

route.param('userId', catchError(getUserById));

route.post('/register', uploadAvatar, catchError(registerUser));
route.post('/login', catchError(login));

route.get('/', query(User), catchError(getAllUsers));
route.get('/search/:keywords', catchError(getAllUsers));

route.get('/profile', requiredAuth, catchError(getLoggedUser));
route
  .route('/:id')
  .get(catchError(getASingleUser))
  .delete(requiredAuth, requiredRole('admin'), catchError(deleteUserById));

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

module.exports = route;
