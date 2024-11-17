import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.token
    
    if (!token) {
      console.log("server error");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token

    if (decoded) {

      req.body.userId = decoded.id; // Attach decoded userId to the request body

      return next(); // Pass control to the next middleware
    } else {
      return res.status(400).json({ success: false, message: "Token could not be decoded" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: "Authentication failed", error: error.message });
  }
};

export default auth;
