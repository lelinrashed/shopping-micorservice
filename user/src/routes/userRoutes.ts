import express from 'express';
import { loginUser, registerUser } from '../controllers/userControler';

const userRoutes = () => {
  const router = express.Router();

  router.post('/register', registerUser);
  router.post('/login', loginUser);

  return router;
};

export default userRoutes;
