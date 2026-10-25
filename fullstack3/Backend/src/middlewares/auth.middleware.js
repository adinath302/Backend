const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  // get the token
  const token = req.cookies.token;

  // if are not available
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // verify cookie
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if it's not artist role
    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "You don't have access " });
    }
    // creating a new property req.user and  giving it a value decoded
    req.user = decoded;

    // to forward the request to the next code
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(403).json({ message: "You don't have access" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { authArtist, authUser };
