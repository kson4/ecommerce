const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils");
const { token } = require("morgan");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  const tokenedUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenedUser });

  // res.status(StatusCodes.CREATED).json({ user: tokenedUser });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }
  const tokenedUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenedUser });

  // res.status(StatusCodes.CREATED).json({ user: tokenedUser });
};
const logout = async (req, res) => {
  res.send("logout");
};

module.exports = {
  register,
  login,
  logout,
};
