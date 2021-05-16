import express from 'express'

const usersRouter = express.Router();

usersRouter.route('/').get(
    (req,res) => 
    {
        console.log("Hola users");
        res.send("Ruta funcional")
    }
)
export default usersRouter