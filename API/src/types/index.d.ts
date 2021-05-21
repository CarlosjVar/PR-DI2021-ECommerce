declare namespace Express {
    interface Request {
        user: Users | null ; 
        isAdmin: any | null;
    }
}