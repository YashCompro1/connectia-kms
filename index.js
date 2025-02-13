const express = require("express");
const crypto = require("crypto");
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4000;
const publicKey = process.env.publicKey

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('working')
});

app.post("/connectia", (req, res) => {

    const { token } = req.body
    const { payload, signature } = JSON.parse(atob(token))

    const verifier = crypto.createVerify('SHA256');
    verifier.update(JSON.stringify(payload));
    verifier.end();

    const verify = verifier.verify(
        {
            key: atob(publicKey),
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
        },
        Buffer.from(signature, 'base64')
    );
    
    const { userId, productId, key, expiry } = JSON.parse(payload)

    if (!verify) {
        return res.status(403).send('Invalid signature')
    }


    if (new Date().getTime() > expiry) {
        return res.status(403).send('Time expired')
    }


    const data = new URLSearchParams({
        user: userId,
        product: productId,
        key: key
    });

    fetch('https://c1.conectia.es/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    })
        .then((response) => response.text())
        .then((text) => {
            return res.send(text);

        })
        .catch((error) => console.error('Error:', error));
});

app.listen(PORT, () => console.log("server started on port", PORT));