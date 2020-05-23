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
  console.log(req.body);
  res.send("ok");
});

mongoose
  .connect("mongodb://localhost/chat-socketio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => console.log("Chat runing..."));
  });
