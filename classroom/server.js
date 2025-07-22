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

//Index - posts
router.get("/", (req, res) => {
    res.send("GET for posts");
});

//Show - posts
router.get("/:id", (req, res) => {
    res.send("GET for posts id");
});

//POST - posts
router.post("/", (req, res) => {
    res.send("POST for posts");
});

//Delete - posts
router.delete("/:id", (req, res) => {
    res.send("Delete for posts id");
});