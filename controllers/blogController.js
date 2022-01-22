const Blog = require("../models/blog");
const pool = require("../db");

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create a blog" });
};
const blog_index = (req, res) => {
  const sql = "SELECT * FROM blog";
  pool
    .query(sql)
    .then((result) => {
      console.log(result.rows);
      res.render("index", { blogs: result.rows, title: "All blogs" });
    })
    .catch((err) => console.log("Error getting blogs" + err));
};
const blog_create_post = (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  const { title, snippet, body } = req.body;

  const sql = "INSERT INTO blog(title,snippet,body) VALUES($1,$2,$3)";
  pool
    .query(sql, [title, snippet, body])
    .then((result) => {
      console.log(result);
      res.redirect("/blogs");
    })
    .catch((err) => console.log("Error saving " + err));
};
const blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("details", { title: "Single blog", blog: result });
    })
    .catch((err) => console.log(err));
};
const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_delete,
};
