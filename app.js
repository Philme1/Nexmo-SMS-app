const express = require("express");
const ejs = require("ejs");
const Nexmo = require("nexmo");
const config = require("config");


//Init Nexmo
const nexmo = new Nexmo({
apiKey: config.get("apiKey"),
apiSecret: config.get("apiSecret")
}, {debug: true});

const app = express();

//Template engine setup
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

//Public folder setup
app.use(express.static(__dirname + "/public"))

//bodyParser
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
  res.render("index")
})

app.post("/", (req, res) => {
  console.log(req.body)

  const { number, text } = req.body;

  nexmo.message.sendSms(config.get("myNumber"), number, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})
})

const PORT = 3000;

 app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
