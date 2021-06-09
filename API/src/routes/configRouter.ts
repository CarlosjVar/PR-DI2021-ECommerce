import express, { Router } from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import { getPayPalClientId } from '../controllers/configController';

const router: Router = express.Router();

router.route('/paypal').get(isAuthenticated, getPayPalClientId);

export default router;
