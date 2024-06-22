import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv-safe";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import colors from "colors";

const swaggerDocument = YAML.load(`${process.cwd()}/swagger/swagger.yaml`);

dotenv.config();

colors.enable();

const app: express.Application | undefined = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

app.use("/static", express.static("public"));
