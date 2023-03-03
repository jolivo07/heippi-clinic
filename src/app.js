import express from "express";
import hbs from 'handlebars'
import indexRoutes from "./routes/index.routes";
import { create } from "express-handlebars";
import path from "path";
import morgan from 'morgan'

const app = express();



app.set("views", path.join(__dirname, "views"));

const exphbs = create({
  layoutsDir: path.join(app.get("views"), "layouts"),
  defaultLayout: "main.hbs",
  extname: ".hsb",
});
app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public' ))
hbs.registerHelper('dateFormat', require('handlebars-dateformat'))


//routes
app.use(indexRoutes);

export default app;
