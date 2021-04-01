const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000

let arr = [];
let auth = [];

app.use(cors());
app.use(express.static("src"));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.get("/api/v1", (req, res, next) => {
  res.send(arr);
});

app.post("/signup", (req, res) => {
  auth = [...auth, req.body];
});

app.put("/login", (req, res) => {
  let authBoolean = false;
  const login = req.body.login
  auth.forEach((it) =>
    it.login === req.body.login && it.password === req.body.password
      ? (authBoolean = true)
      : (authBoolean = false)
  );
  res.send({authBoolean, login})
  console.log(authBoolean)
});

app.put("/array", (req, res) => {
  arr = arr.map((it) =>
    it.id === req.body.flatNumber
      ? (it = {
          id: req.body.flatNumber,
          flatNumber: req.body.flatNumber,
          flatSquare: `${req.body.flatSquare} m2`,
        })
      : it
  );
  res.send(req.body);
});

app.post("/array", (req, res) => {
  const arrId = arr.map((it) => it.id);

  if (!arrId.includes(req.body.flatNumber) || arr.length === 0) {
    return (arr = [
      ...arr,
      {
        id: req.body.flatNumber,
        flatNumber: req.body.flatNumber,
        flatSquare: `${req.body.flatSquare} m2`,
      },
    ]);
  }
  res.send(req.body);
});

app.get("/list", (req, res) => {
  arr.sort(function (a, b) {
    return a.flatNumber - b.flatNumber;
  });
  res.json(arr);
  // console.log(arr);
});

// app.get('/:thing', (req, res, next) => {
//   arr = [...arr, {id: arr.length + 1, item: req.params.thing}]
//   res.send(arr);
//   console.log(arr)
// })

app.listen(PORT, () => {
  console.log(`Server working on port: ${PORT},`, new Date());
});
