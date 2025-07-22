const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

//Index - users
app.get("/users", (req, res) => {
    res.send("GET for users");
});

//Show - users
app.get("/users/:id", (req, res) => {
    res.send("GET for users");
});

//POST - users
app.get("/users", (req, res) => {
    res.send("POST for users");
});

//Delete - users
app.get("/users/:id", (req, res) => {
    res.send("Delete for users");
});

//Index - posts
app.get("/posts", (req, res) => {
    res.send("GET for posts");
});

//Show - posts
app.get("/posts/:id", (req, res) => {
    res.send("GET for posts id");
});

//POST - posts
app.post("/posts", (req, res) => {
    res.send("POST for posts");
});

//Delete - posts
app.delete("/posts/:id", (req, res) => {
    res.send("Delete for posts id");
});

app.listen(3000, (req, res) => {
    console.log("Server is listening to the port 3000");
});