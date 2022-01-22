const mongoose = require("mongoose");
const express = require("express");
const blogRoute = require("./routes/blogRoutes");
const app = express();
const pool = require("./db");
app.listen(3000);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/blogs", blogRoute);
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
