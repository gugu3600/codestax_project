export const authValidator = async (req,res,next) =>
     {
          const {name,email,password} = req.body;
          console.log(email,password);
          if(email.trim().length < 1 || password.trim().length < 1){
               console.error("Username or Password cannot be nulled");
               return res.status(422).json({message : "Username or Password is required"});
          }
          res.locals.data = {name, email, password};
          return next();
     }
