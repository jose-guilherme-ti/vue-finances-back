const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function getUserId(context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");

    const { userId } = jwt.verify(token, JWT_SECRET);
    return userId;
  }

  throw new Error("not authenticated!");
}

module.exports = {
  getUserId,
};
