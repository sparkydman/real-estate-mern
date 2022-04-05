module.exports = (req) => {
  return req.params.keywords
    ? {
        $or: [
          {
            firstname: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            lastname: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
        ],
      }
    : {};
};
