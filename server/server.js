const express = require("express");
const request = require("request");
const router = require("./router");
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(router);
const port = process.env.PORT || 3000;
app.post("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500/",
        "Access-Control-Allow-Header": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    });
    let codeBody = [];
    req
        .on("data", chunk => {
            codeBody.push(chunk);
        })
        .on("end", () => {
            codeBody = Buffer.concat(codeBody).toString();
            bodyObj = JSON.parse(codeBody);
            console.log(bodyObj);
            let code = bodyObj.code.toString();
            let language = bodyObj.language.toString();
            let inputs = bodyObj.standardIn.toString();
            var program = {
                script: code,
                language: language,
                stdin: inputs,
                versionIndex: "0",
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET
            };
            request(
                {
                    url: "https://api.jdoodle.com/v1/execute",
                    method: "POST",
                    json: program
                },
                function (error, response, body) {
                    console.log("error:", error);
                    console.log("statusCode:", response && response.statusCode);
                    console.log("body:", body);
                    res.json(body);
                }
            );
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
