import jwt from "jsonwebtoken";
import { User } from "../models";
import { JWT_SECRET } from "../config";

export const signin = async (req, res) => {
  
    const  { email, password } = req.body;

    const userFound = await User.findOne({ email });

    if(!userFound) return res.status(401).json({
          message: 'User not found'
    });

    const isMatch = await userFound.comparePassword(password);

    if(!isMatch) return res.status(401).json({ message: 'Invalid password ' });

    jwt.sign({
        id: userFound._id
    }, JWT_SECRET, (err, token) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json({ token });
        }
    });

}

export const signup = async (req, res) => {
    const  { email, password } = req.body;
    const user = new User({ email, password });

    user.password = await user.generateHash(password);

    const userFound = await User.findOne({ email });

    if(userFound) {
      res.statusMessage = 'User already exists';
      return res.status(400).json({
          message: 'User already exists'
      });
    }

    const userSaved = await user.save();

    jwt.sign({
        id: userSaved._id
    }, JWT_SECRET, (err, token) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json({ token });
        }
    });
}

export const profile = async (req, res) => {
    const userFound = await User.findOne({ _id: req.userID }).select('-password');

    if(!userFound) return res.status(401).json({ message: 'User not found' });

    res.json( userFound);
}