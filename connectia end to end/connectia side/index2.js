// Connectia Side
const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = 3008

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.post('/token', async (req, res) => {


    const { token } = req.body
    const { signature, payload } = JSON.parse(atob(token))
    const stringifiedPayload = JSON.stringify(payload)


    const secretKey = 'f63b7daf2aefc760fa0af3078a51dfffc8bc63082405fc7c7479ed5863ce9d96d036e67b4a585d8f9da6b518c52dffa5'

    const expectedSignature = crypto.createHmac('sha256', secretKey)
    .update(stringifiedPayload)
    .digest('hex');
    console.log("🚀 ~ app.post ~ expectedSignature:", expectedSignature)

    const { expiry } = payload

    if (new Date().getTime() > expiry) {

        return res.status(401).send('Token Expired');
    }


    if (expectedSignature === signature) {
        // Extract userid and product code
        // Launch connectia page
        return res.status(200).send('Valid');
    } else {
        return res.status(401).send('Invalid token');
    }
});


app.listen(PORT, () => {
    console.log('Server 1 is running on http://localhost:' + PORT);
});
