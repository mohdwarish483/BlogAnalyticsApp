import express from "express";
import blogRoutes from "./routes/blogRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/api", blogRoutes);
// using errror hanlder middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
