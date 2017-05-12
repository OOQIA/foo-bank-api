import express from 'express';
import AuthController from '../controllers/authController';

export default () => {
  const router = express.Router();
  const controller = new AuthController();

  router.route('/authenticate')
    .post((req, res) => controller.post(req, res));

  return router;
};
