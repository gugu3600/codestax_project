export const authorization = (req,res,next) => {

    const {user} = res.locals;
    // console.log(user);
    
    if(user.role_id != 1 || user.role !== "admin"){
        console.error("User is not Admin Role");
        return res.status(403).json({message : "403 Forbidden permission required"});
    }

    return next();
}