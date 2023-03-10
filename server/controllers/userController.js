const User = require("../models/userModel");
const generateToken = require("../utils/userToken");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please enter all the fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    let userData = { name, email, password };
    if (pic) userData.pic = pic;

    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        success: true,
        status: 201,
        token: generateToken({
          id: user._id,
        }),
        message: "User registered successfully",
      });
    } else {
      res.status(500);
      throw new Error("Failed to create user. Please try again later.");
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please enter all the fields.");
    }

    const userExists = await User.findOne({ email });

    if (userExists && password == userExists.password) {
      res.status(200).json({
        success: true,
        status: 201,
        token: generateToken({
          id: userExists._id,
        }),
        message: "User registered successfully",
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
};
