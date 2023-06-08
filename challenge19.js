const express = require("express");
var bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
let file = JSON.parse(fs.readFileSync("data.json", "utf8"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("challenge19", { data: file });
});

app.get("/add", (req, res) => {
  res.render("add");
});
app.post("/add", (req, res) => {
  file.push({
    id: file.length,
    string: req.body.string,
    integer: req.body.integer,
    float: req.body.float,
    date: req.body.date,
    boolean: req.body.boolean,
  });
  fs.writeFileSync("data.json", JSON.stringify(file));
  res.redirect("/");
});
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  file.splice(id, 1);
  fs.writeFileSync("data.json", JSON.stringify(file));
  res.redirect("/");
});
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  res.render("edit", { data: file[id] });
});
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  let edit = {
    string: req.body.string,
    integer: req.body.integer,
    float: req.body.float,
    date: req.body.date,
    boolean: req.body.boolean,
  };
  console.log(req.body);
  file.splice(id, 1, edit);
  fs.writeFileSync("data.json", JSON.stringify(file));
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`On listening port ${port}`);
});
