import "dotenv/config"
const api = process.env.APP_URL;
export const corsConfig = {
     origin : api,
     methods : ["GET","POST","PUT","DELETE"],
     allowedHeaders: ["Authorization","Content-Type"],
     credentials : true
}