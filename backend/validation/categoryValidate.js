export const categoryValidator = async (req, res, next) => {


     const { name } = req.body;

     if (name.trim().length < 1) {
          console.error("Category name is null , Enter something");
          return res.status(422).json({ message: "Category name cannot be nulled" });
     }
     res.locals.name = name;
     return next();
}

