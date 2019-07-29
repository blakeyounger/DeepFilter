const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

var algorithmia = require("algorithmia");
var client = algorithmia("simq2Mg/MzWZUNQ2f4dH3UklgRr1");

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.post("/api", (req, res) => {
  //Algorithmia
  var input = {
    images: req.body.imageURL,
    savePaths: [
      "data://.algo/deeplearning/DeepFilter/temp/elon_space_pizza.jpg"
    ],
    filterName: req.body.filterName,
    mode: "quality"
  };
  algorithmia
    .client("simt8ET7AUsvIhNAQ91NZbALzbd1")
    .algo("deeplearning/DeepFilter/0.6.0?timeout=300") // timeout is optional
    .pipe(input)
    .then(function(response) {
      console.log(response.get().savePaths);
      //console.log(JSON.stringify(response.get().savePaths));
      console.log(response.get().savePaths.toString());
      dataString = response.get().savePaths.toString();

      client.file(dataString).get(function(err, data) {
        if (err) {
          console.log("Failed to download file.");
          console.log(err);
        } else {
          console.log("Successfully downloaded data.");
        }
        var imageBuffer = data;
        //console.log("Buffer: " + imageBuffer);
        var imageBase64 = Buffer.from(imageBuffer).toString("base64");
        //console.log(imageBase64);
        res.send({ imageBase64 });
      });
    });
  //the idea here is to send the base64 to react, which you can convert to a jpg or png there. having trouble sending this to react
});
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
