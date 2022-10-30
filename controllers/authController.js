const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createJWT } = require("../utils");

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
  const token = createJWT({ payload: tokenedUser });
  const cookieDuration = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: newDate(Date.now() + cookieDuration),
  });
  res.status(StatusCodes.CREATED).json({ user: tokenedUser });
};
const login = async (req, res) => {
  res.send("login");
};
const logout = async (req, res) => {
  res.send("logout");
};

module.exports = {
  register,
  login,
  logout,
};
