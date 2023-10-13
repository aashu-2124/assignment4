/********************************************************************************* BTI325 – Assignment 03*
 * * I declare that this assignment is my own work in accordance with Seneca's* 
 * Academic Integrity Policy:*
 * * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html*
 * * Name: RAZAN NAYEF______________________ Student ID: ___137809190___________ Date: _2023-09-28_____________*
 * ********************************************************************************/


const legoData = require("./modules/legoSets");
const express = require("express");
const app = express();
const path = require("path");

const { initialize, getAllSets, getSetByNum, getSetsByTheme } = legoData;

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/home.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views/about.html"));
});

app.get("/lego/sets", (req, res) => {
  const theme = req.query.theme;
  if (theme) {
    getSetsByTheme(theme)
      .then((data) => res.send(data))
      .catch((err) => res.status(404).send(err));
  } else {
    getAllSets()
      .then((data) => res.send(data))
      .catch((err) => res.status(404).send(err));
  }
});

app.get("/lego/sets/:setNum", (req, res) => {
  const num = req.params.setNum;

  getSetByNum(num)
    .then((data) => res.send(data))
    .catch((err) => res.status(404).send(err));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views/404.html"));
});

initialize()
  .then(() => {
    app.listen(8080, () => console.log("App is running on the port 8080."));
  })
  .catch((err) => console.log(err));
