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

//this section of code should only run when in production, when the app is in Heroku
if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets
  //for example, main.js or main.css
  //this is meant to respond to a request for a specific file
  //for example, /client/build/static/js/main.js
  app.use(express.static("client/build")); //if a request comes for a route that does not have a route handler, then look in the client/build directory to find the file
  //if the file cannot be found using the line above, it will execute the code below

  //Express will serve up the index.html file
  //if it doesn't recognize the route
  //this is meant to be a catch-all if the route is not handled above
  //this assumes React-router knows what to do with this route

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
