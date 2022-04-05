module.exports = (req) => {
  const keywords = req.params.keywords
    ? {
        $or: [
          {
            title: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            address: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            condition: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            keywords: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            category: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            ['agent.firstname']: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
          {
            ['agent.lastname']: {
              $regex: req.params.keywords,
              $options: 'i',
            },
          },
        ],
      }
    : {};
  return keywords;
};
