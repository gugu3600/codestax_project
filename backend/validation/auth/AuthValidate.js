export const authValidator = async (req,res,next) =>
     {
          const {name,password} = req.body;

          if(name.trim().length < 1 || password.trim().length < 1){
               console.error("Username or Password cannot be nulled");
               return res.status(422).json({message : "Username or Password is required"});
          }
          res.locals.data = { name, password };
          return next();
     }
