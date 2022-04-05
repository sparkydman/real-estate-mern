// Get all properties
// authorization public
// Return the response from the query middleware
module.exports = async (req, res) => res.status(200).json(res.queryResults);
