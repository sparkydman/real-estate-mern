module.exports = (role, field) => {
  const queryOptions = {};
  if (role === 'admin') {
    queryOptions._id = field;
  } else {
    queryOptions._id = field;
    queryOptions.enable = true;
  }
  return queryOptions;
};
