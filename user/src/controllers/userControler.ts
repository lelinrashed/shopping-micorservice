import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { z } from 'zod';
import { loginUserSchema } from '../schema/loginUser';
import { registerUserSchema } from '../schema/registerUser';

const prisma = new PrismaClient();

/**
 * Register a new user
 * @param req name, email, password
 * @param res message
 * @returns message
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    // const redis = new Redis('redis://redis:6379');

    // validate data
    const validatedData = registerUserSchema.parse(req.body);
    const { email, name, password } = validatedData;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // generate password hash
    const hashedPassword = await hash(password, 10);

    // await redis.publish('userCreated', JSON.stringify({ email, name }));

    // Create a new user in the database
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });

    return res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation failed
      const validationErrors = error.errors.map((err) => err.message);
      return res.status(400).json({ success: false, errors: validationErrors });
    } else {
      // Other error occurred
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
};

/**
 * Login a user
 * @param req email, password
 * @param res token, user
 * @returns users
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    // validate data
    const validatedData = loginUserSchema.parse(req.body);
    const { email, password } = validatedData;

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    // check if the password is correct
    const isPasswordCorrect = await compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    // create a jwt token
    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET as Secret, { expiresIn: '7d' });

    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        token
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation failed
      const validationErrors = error.errors.map((err) => err.message);
      return res.status(400).json({ success: false, errors: validationErrors });
    } else {
      // Other error occurred
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
};

/**
 * logout a user
 * @param req
 * @param res
 * @returns message
 */
export const logoutUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ success: true, message: 'User logged out successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
