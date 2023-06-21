const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let workItems = [];
let items = ["Buy Food", "Cook Food", "Eat Food"];
app.get("/", function (req, res) {
    let day = date.getDate();
    res.render("list", { ListTitle: day, newListItems: items });
});
app.post("/", function (req, res) {
    if (req.body.list === "Work") {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }
});
app.get("/work", function (req, res) {
    res.render("list", { ListTitle: "Work List", newListItems: workItems });
});
app.listen(3000, function () {
    console.log("Server started on port 3000.");
});
