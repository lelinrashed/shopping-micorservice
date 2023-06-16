import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import Redis from 'ioredis';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const redis = new Redis('redis://redis:6379');

    // Check if the data is cached in Redis
    const cachedProducts = await redis.get('products');

    if (cachedProducts) {
      // If cached data exists, return it
      const products = JSON.parse(cachedProducts);

      return res.status(200).json({ success: true, message: 'Get all products from cache', data: products });
    } else {
      const prisma = new PrismaClient();

      // If no cached data, fetch from the database and store in Redis
      const products = await prisma.product.findMany();

      // Store the fetched data in Redis for future use
      await redis.set('products', JSON.stringify(products), 'EX', 10);

      return res.status(200).json({ success: true, message: 'Get all products', data: products });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const redis = new Redis('redis://redis:6379');

    // Check if the data is cached in Redis
    await redis.del('products');

    return res.status(200).json({ success: true, message: 'Delete cache' });
  } catch (error) {}
};
