import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user.model.js";

const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      console.log(req.user);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Unauthorized user, token failed");
    }
  } else {
    res.status(401);
    throw new Error("User not logged in, No token");
  }
};

export { protect };
