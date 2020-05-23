const session = require("express-session");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "socketio",
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  })
);

app.get("/", (req, res) => res.render("home"));
app.post("/", (req, res) => {
  req.session.user = {
    name: req.body.name,
  };
  res.redirect("/room");
});

app.get("/room", (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
  }
  res.render("room", {
    name: req.session.user.name,
  });
});

mongoose
  .connect("mongodb://localhost/chat-socketio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => console.log("Chat runing..."));
  });
