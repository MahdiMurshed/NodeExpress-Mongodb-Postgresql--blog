const mongoose = require("mongoose");
const express = require("express");
const blogRoute = require("./routes/blogRoutes");
const app = express();

const dbURI =
  "mongodb+srv://mahdi:mongomahdi@cluster0.5mpo9.mongodb.net/firstdb?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(3000, (req, res) => {
      console.log("DB connceted.Running at port 3000");
    })
  )
  .catch((err) => console.log(err));

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
