
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { errorHandler } from '../utils/errorHandler.js';
import User from '../model/user.model.js';


export const signup = async (req , res , next) => {
    const { username , email , password } = req.body;

    if(!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
        return next(errorHandler(400 , 'All fields are required'));
    }
    const hashPassword = bcryptjs.hashSync(password , 10);
    const newUser = new User({
        username,
        email,
        password: hashPassword,
    });

    try {
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User created successfully'
        })
    } catch (error) {
        return next(error);
    }
};

export const signin = async (req , res , next) => {
    const { email , password } = req.body;

    if(!email || !password || email.trim() === '' || password.trim() === '') {
        return next(errorHandler(400 , 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
          return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
          return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);
    
        const { password: pass, ...rest } = validUser._doc;
    
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } catch (error) {
        next(error);
      }
}