const express = require("express");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/post");
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));
app.use("/users", users);
app.use("/posts", posts);

app.get("/getsignedcookie", (req, res) => {
    res.cookie("made-in", "India", {signed: true});
    res.send("Signed cookies are here");
});

app.get("/verify", (req, res) => {
    console.log(req.signedCookies);
    res.send("verified");
});

app.get("/getcookies", (req, res) => {
    res.cookie("greet", "hello");
    res.cookie("madeIn", "India");
    res.send("This is cookie Route");
});

app.get("/greet", (req, res) => {
    let { name = "Anonymous"} = req.cookies;
    res.send(`Hi, ${name}`);
})

app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("Hi, I am root");
});

app.listen(3000, (req, res) => {
    console.log("Server is listening to the port 3000");
});

