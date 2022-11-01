const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

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
  const tokenedUser = createTokenUser(user);
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
    throw new CustomError.UnauthenticatedError("Invalid credentials: email");
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new CustomError.UnauthenticatedError("Invalid credentials: password");
  }
  const tokenedUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenedUser });

  // res.status(StatusCodes.CREATED).json({ user: tokenedUser });
};
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "logged out user" });
};

module.exports = {
  register,
  login,
  logout,
};
