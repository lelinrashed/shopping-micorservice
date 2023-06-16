import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

interface Product {
  title: string;
  description: string;
  photo: string;
  price: number;
  rating: number;
}

function generateProducts(count: number) {
  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    const product = {
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      photo: faker.image.url(),
      rating: faker.number.int({ min: 1, max: 5 }),
      price: faker.number.int({ min: 10, max: 100 })
    };
    products.push(product);
  }

  return products;
}

async function seed() {
  try {
    const products = generateProducts(20);
    const createdProducts = await prisma.product.createMany({
      data: products,
      skipDuplicates: true
    });
    console.log('Created products:', createdProducts);
    // Seed your data here using Prisma queries
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
