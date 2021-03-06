import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import customers from "./routes/customers/customers.js";
import vehicles from "./routes/vehicles/vehicles.js";
import updates from "./routes/updates/updates.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.APPLICATION_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) throw new Error(error);

    console.log("Database connection established.");
  }
);

app.use("/customers", customers);

app.use("/vehicles", vehicles);

app.use("/updates", updates);
