const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const cookieParser = require("cookie-parser");
const jwtSecret = "4c0d608098b78d61cf5654965dab8b53632bf831dc6b43f29289411376ac107b";
const jwt = require("jsonwebtoken");
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// to parse cookies sent with request
app.use(cookieParser());

function validationJWTMiddleware(req, res, next) {
    const { user, token, product } = req.body

    jwt.verify(token, jwtSecret, (err, jwtResponse) => {
        if (err) {
            console.log(err);
            return res.status(403).send("Could not verify token");
        }
        console.log(jwtResponse)
        req.body.key = jwtResponse.key;
        delete req.body.token
    });
    next();
};


app.use(validationJWTMiddleware)

app.use("/", (req, res) => {
    console.log(req.body)
    console.log(req.path)
    return res.send('Working');
});

app.use("/validateContent", (req, res) => {

});

app.listen(PORT, () => console.log("server started on port", PORT));