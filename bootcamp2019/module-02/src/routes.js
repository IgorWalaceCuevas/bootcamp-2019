import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Sequelize.STRING',
    email: 'Sequelize.STRING',
    password_hash: 'Sequelize.STRING',
  });
  return res.json(user);
});

export default routes;
