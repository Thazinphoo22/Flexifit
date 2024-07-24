const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "token required" });
  }

  const token = req.header("authorization").replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ status: "error", msg: "not authorised" });
    }
  } else {
    return res.status(403).json({ status: "error", msg: "forbidded" });
  }
};

const memberAuth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({
      status: "error",
      msg: "no token found",
    });
  }
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      console.log(decoded);
      if (decoded.role === "member") {
        req.decoded = decoded;
        next();
      }
    } catch (error) {
      return res.status(401).json({ status: "error", msg: "not authorised" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "missing token" });
  }
};

const fitness_studioAuth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({
      status: "error",
      msg: "no token found",
    });
  }
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      console.log(decoded);
      if (decoded.role === "fitness_studio") {
        req.decoded = decoded;
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      return res.status(401).json({ status: "error", msg: "not authorised" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "missing token" });
  }
};

module.exports = { auth, fitness_studioAuth, memberAuth };
