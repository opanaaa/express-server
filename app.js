const express = require("express"),
    app = express(),
    fs = require("fs"),
    path = require("path"),
    https = require("https");
var cors = require("cors");
var url = require("url");
var corsOptions = {
    origin: "https://localhost",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//var q = url.parse(adress, true);

app.use(
    cors({
        origin: [
            "https://joinposter.com",
            "https://platform.joinposter.com",
            "http://localhost:3000",
            "https://localhost:3000",
        ],
    })
);

certfile = fs.readFileSync(path.join(__dirname, "cert", "cert.pem"));
keyfile = fs.readFileSync(path.join(__dirname, "cert", "key.pem"));

const secureserver = https.createServer(
    { cert: certfile, key: keyfile, passphrase: "trendoceans" },
    app
);

app.use(async function (req, res, next) {
   // console.log(req)
    //console.log(req.path);
    var newreq = decodeURI(req.path);
    console.log(newreq);
    await fetch("http://localhost:4444" + newreq, {
        method: "GET",
        mode: "cors",
    }).then((response) => { console.log(response.status) });
    
    res.json({ ok: 1 });
});

app.get("/", cors(corsOptions), (req, res) => {
     res.send("Hello, TREND OCEANS!");
});

secureserver.listen(3000, console.log(`Server started on port 3000`));
