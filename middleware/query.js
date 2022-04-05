const propertySearch = require('../utils/propertySearch');
const userSearchKeyword = require('../utils/userSearchKeyword');

const query = (model, populate) => async (req, res, next) => {
  let query;

  const queryValue = { ...req.query };

  const keywords = req.url.concludes('user/search')
    ? userSearchKeyword(req)
    : propertySearch(req);

  //   Query string that should not be treated as fields
  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach((field) => delete queryValue[field]);

  //   Convert the query into string in  order to be formated
  let queryString = JSON.stringify(queryValue);

  //   Filter and format the mongodb query operations
  queryString = queryString.replace(
    /\b(gt|lt|in|gte|lte)\b/g,
    (match) => `$${match}`
  );

  const queryOption = {};
  if (req.user && req.user.role === 'admin') {
    queryOption.$or = [
      {
        enable: true,
      },
      {
        enable: false,
      },
    ];
  } else {
    queryOption.enable = true;
  }

  //   Find resource
  query = model.find({
    ...queryOption,
    ...keywords,
    ...JSON.parse(queryString),
  });

  //   populate query
  if (populate) {
    query = query.populate(populate);
  }

  //   Handle selecting; query some specific fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //   Handle sorting; sort data by some fields.
  // Use the createdAt field in descending order as default
  if (req.query.sort) {
    const sortby = req.query.sort.split(',').join(' ');
    query = query.sort(sortby);
  } else {
    query = query.sort('-createdAt');
  }

  //   Handle pagination and Limit,
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const results = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }
  res.queryResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};

module.exports = { query };
