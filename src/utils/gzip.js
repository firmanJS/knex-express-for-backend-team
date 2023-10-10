const compression = require('compression');

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
};
exports.useGzip = () =>
  compression({
    filter: shouldCompress,
    threshold: 0
  });
