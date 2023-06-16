import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';

// Initialize express
const app: Express = express();
const PORT = process.env.PORT || 8003;

// Initialize Redis
// const redis = new Redis('redis://redis:6379');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: '*'
  })
);

// Subscribe to the 'userCreated' channel
// redis.subscribe('userCreated', (err) => {
//   if (err) {
//     console.error('Failed to subscribe:', err);
//   } else {
//     console.log('Order service subscribed to userCreated channel');
//   }
// });

// Handle incoming userCreated events
// redis.on('message', async (channel, message) => {
//   if (channel === 'userCreated') {
//     try {
//       const prisma = new PrismaClient();
//       const { email, name } = JSON.parse(message);
//       await prisma.user.create({
//         data: {
//           name,
//           email
//         }
//       });
//     } catch (error) {
//       console.log('Error occurred while creating user and save user to order db', error);
//     }
//   }
// });

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello Worldddddd!' });
});

app.post('/api/order', async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  // await prisma.order.create({ data: {

  // } });

  res.json({ message: 'Hello Worldddddd!' });
});

// handle 404 route
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
