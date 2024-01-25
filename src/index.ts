import express from "express";
import morgan from "morgan";
//import cors from "cors";

const app = express();

import { routes } from "./index.routes";

// settings
app.set("port", process.env.PORT || 9000);


// middlewares
app.use(express.json());
app.use(morgan("dev"));


app.use("/api", routes);

app.listen(app.get("port"), () => {
    console.log("Server on port : ", app.get("port"));
});

export {app};