export const productValidator = async (req, res, next) => {


     const data = req.body;

     if (data.name.trim().length < 1) {
          console.error("Product name is null , Enter something");
          return res.status(422).json({ message: "Category name cannot be nulled" });
     }

     res.locals.data = data;
     return next();
}

