const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const authRoutes = require("./routes/auth.routes");
const songRoutes = require("./routes/songs.routes");

app.use(cors({
     origin: "*",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"));

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);


module.exports = app;