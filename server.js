/********************************************************************************* BTI325 – Assignment 03*
 * * I declare that this assignment is my own work in accordance with Seneca's* 
 * Academic Integrity Policy:*
 * * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html*
 * Name: Aastha Kalpeshkumar Patel      Student ID: 118841220    Date: 3 movember 2023   *
 * ********************************************************************************/

const legoData = require("./modules/legoSets");
const express = require("express");
const app = express();
const path = require("path");
app.set("view engine","ejs");

const { initialize, getAllSets, getSetByNum, getSetsByTheme } = legoData;

app.use(express.static('public'));

app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, "views/home.html"));
  res.render("home");
});
app.get("/about", (req, res) => {
  //res.sendFile(path.join(__dirname, "views/about.html"));
  res.render("about");
});

app.get("/lego/sets", (req, res) => {
  const theme = req.query.theme;
  if (theme) {
    getSetsByTheme(theme)
      .then((data) => res.render("sets", { sets: data }))
      .catch((err) => res.status(404).send(err));
  } else {
    getAllSets()
      .then((data) => res.render("sets", { sets: data }))
      .catch((err) => res.status(404).send(err));
  }
});

app.get("/lego/sets/:setNum", (req, res) => {
  const num = req.params.setNum;

  getSetByNum(num)
    .then((data) => res.render("sets", { sets: data }))
    .catch((err) => res.status(404).send(err));
});

app.use((req, res) => {
  //res.status(404).sendFile(path.join(__dirname, "views/404.html"));
  res.status(404).render("404");
});

initialize()
  .then(() => {
    app.listen(8080, () => console.log("App is running on the port 8080."));
  })
  .catch((err) => console.log(err));
