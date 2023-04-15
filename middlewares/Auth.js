const jwt = require('jsonwebtoken');

function auth(request, response, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {

    res.status(401).json({ error: 'Unauthorized: Missing token' });

  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (err) {

    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });

  }
}

module.exports = auth;

// Authorization: Bearer mytoken123

