import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

const generateToken = (data:any) =>
{
    return jwt.sign(data,process.env.SECRET_KEY as string,{expiresIn: '1h'});
}

export default generateToken