const jwt = require("jsonwebtoken");

function Auth(req, res, next) {
  const token = req.headers["authorization"];
  // console.log(req.headers);
  console.log(token);
  if (!token)
    return res
      .status(401)
      .send({ message: "Access Denied. No token Provided." });
  try {
    const tokn = token.slice(7);
    jwt.verify(tokn, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send(err);
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: `Error: ${error}` });
  }
}

module.exports = Auth;
