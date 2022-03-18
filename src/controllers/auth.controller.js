import createError from "http-errors";
import { User } from "../models";
import { userSchema } from "../libs/schema.validator";
import { signAccessToken } from '../helpers/signAccessToken';

export const signin = async (req, res, next) => {
  try {
    const { email, password } = await userSchema.validateAsync(req.body);

    const userFound = await User.findOne({ email });

    if (!userFound) throw createError(401, "Invalid Email or Password");

    const isMatch = await userFound.comparePassword(password);

    if (!isMatch) throw createError(401, "Invalid Email or Password");

    const token = await signAccessToken(userFound._id);

    res.json({ token });
  } catch (error) {
    if (error.isJoi) error.status = 400;
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = await userSchema.validateAsync(req.body);
    const userFound = await User.findOne({ email });

    if (userFound) throw createError.Conflict("User already exists");

    const user = new User({ email, password });
    user.password = await user.generateHash(password);

    const userSaved = await user.save();

    const token = await signAccessToken(userSaved._id);

    res.json({ token });
  
  } catch (error) {
    if (error.isJoi) error.status = 400;
    next(error);
  }
};

export const profile = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ _id: req.userID }).select("-password");
  
    if (!userFound) throw createError(401, 'User not found');
    res.json({  user: userFound });
  } catch (error) {
    if (error.isJoi) error.status = 400;
    next(error);
  }
};
