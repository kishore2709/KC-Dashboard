module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }
  if (err.code === 'permission_denied') {
    res.status(403).send('Forbidden');
  }
  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
