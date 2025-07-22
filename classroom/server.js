const express = require("express");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/post");

app.use("/users", users);
app.use("/posts", posts);

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

app.listen(3000, (req, res) => {
    console.log("Server is listening to the port 3000");
});

