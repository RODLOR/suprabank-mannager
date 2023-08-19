import express from "express";
import cors from "cors";
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PORT } from "./config.js";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";
import exportDataRoute from "./routes/exportData.routes.js"
import clients from "./routes/clients.routes.js"
import loans from "./routes/loans.routes.js"


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: "userId",
    secret: "atanu",
    resave: false,
    saveUninitialized: false,
    // cookie:{
    //     expires:60*60*60*24,
    // }
}));

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)

app.use(indexRoutes);
app.use(authRoutes);
app.use(exportDataRoute);
app.use(clients);
app.use(loans);

app.use(express.static(join(__dirname, 'storedData/profilePhotos')));

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
