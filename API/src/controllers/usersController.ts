export const getCurrentAuth = (req:any,res:any) =>
{   
    res.json({user:req.user,
        isAdmin: req.isAdmin})
}
