import express from 'express'

const ordersRouter = express.Router();

// @route   GET - /api/users/test
// @desc    Test user route
// @access  Public
ordersRouter.route('/').get(
    () => 
    {
        console.log("Hola orders");
    }
)
export default ordersRouter