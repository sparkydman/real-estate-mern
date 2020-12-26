import express from 'express';

const route = express.Router();

// ----------USER CRUD -------------

// @route /api/user/
// @method POST
// @authorization Private
// @desc Add user
route.post('/', (req, res) => {
  res.send('add a user');
});

// @route /api/user/
// @method GET
// @authorization Public
// @desc Get all properties
route.get('/', (req, res) => {
  res.send('get all properties');
});

// @route /api/user/:id
// @method GET
// @authorization Public
// @desc Get a single user
route.get('/:id', (req, res) => {
  res.send('get a single user');
});

// @route /api/user/:id
// @method PUT
// @authorization Private
// @desc update a user
route.put('/:id', (req, res) => {
  res.send('update a user');
});

// @route /api/user/:id
// @method DELETE
// @authorization Private
// @desc Delete a user
route.delete('/:id', (req, res) => {
  res.send('delete a user');
});

export default route;
