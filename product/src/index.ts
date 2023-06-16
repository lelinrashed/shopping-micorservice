import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import productRoutes from './routes/productRoutes';

// Initialize express
const app: Express = express();
const PORT = process.env.PORT || 8002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: '*'
  })
);

// Product route
app.use('/api', productRoutes());

// handle root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello Worldddddd!' });
});

// handle 404 route
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// start the Express server
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
