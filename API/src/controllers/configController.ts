import { Request, Response } from 'express';

// @route   GET - /api/config/paypal
// @desc    Gets the paypal client id
// @access  Private
export const getPayPalClientId = async (req: Request, res: Response) => {
  return res.json({ paypalClientId: process.env.PAYPAL_CLIENT_ID });
};
