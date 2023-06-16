import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import userRoutes from './routes/userRoutes';

// Initialize express
const app: Express = express();
const PORT = process.env.PORT || 8001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: '*'
  })
);

// User route
app.use('/api/users', userRoutes());

// handle root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, from user service!!!' });
});

// handle 404 route
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// boot up the server
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
