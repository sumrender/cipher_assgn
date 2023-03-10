const express = require("express");
const connectDB = require("./utils/db");
const showRequests = require("./middlewares/showRequests");
const userRoutes = require("./routes/userRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(express.json());
app.use(showRequests);

// routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("server is running");
});

// error middleware
app.use(errorMiddleware);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
