import express from "express";
const app = express();
import body_parser from "body-parser";
import qr from "qrcode";

app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res) => {
  const url = req.body.url; // getting the url

  if (url.length === 0) {
    res.send("No url Found!");
  }

  qr.toDataURL(url, (err, src) => {
    if (err) {
      res.send("Some Error Occured!");
    }
    res.render("scan", { src });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server up and Running at ", port);
});