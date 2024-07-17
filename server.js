const express = require("express");
const app = express();
const port = 8080;
const cookieParser = require("cookie-parser")

app.get('/', (req, res) => res.send("Coming Soon!"))

app.get("/login", (req, res) => {
    if (!req.query.name) {
        res.status(400).send("Error must include a name query!")
    } else {
        var opts = {
            maxAge: 900000,
            httpOnly: true,
            sameSite: 'strict',
        };
        res.cookie('name', req.query.name, opts);
        res.status(200).send("Go to /hello")

    }
})

app.use(cookieParser())

app.get("/hello", (req, res) => {
    var opts = {
        maxAge: 900000,
        httpOnly: true,
        sameSite: 'strict',
    };
    console.log(req.cookies.name)

    res.status(200).send(`Welcome ${req.cookies.name}!`)
})

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))