// Connectia Side

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const PORT = 3008
const jwtSecret = "f63b7daf2aefc760fa0af3078a51dfffc8bc63082405fc7c7479ed5863ce9d96d036e67b4a585d8f9da6b518c52dffa5"
const publicKey = `LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJDZ0tDQVFFQXBuR21XN2xVcENpYzRGTjh2UDYxQXdGS0o0d2FCZm5hSXc4SWg2aGoyWDMyclJNdVNQdlUKeno4YzA5V3pQbjRJTnNQNzZoWU5NVXBDRWhaWVRQSERlNm40VVdiajFJeXdSWmpEYTBPdEg1WGtoUGpWcGJGdwpDVkkybS85emhJejdQQlJoU2RUMmExMHhPYjN5cm1FK2xpc3pkTU1INytSN1NQOEpGZlJabGlKOXdDSE9HdFE5CmVhTDVHZUpqWjY5cnF4K0JmRXQ0MGRmR2szZDd4TGJCaDljVlZUSlpkL2JDSHIzYkVDTVR0bk1WelBQOUZPN0sKU1NWVFgxa1VZcFdueGJkeFgyR2NlVzh4dWY2Rm4yQzFwMlo4OXQ3ZUdkLyt1alVUSGR5dHcvMlJ0Zk92cVk5SQpMYlJqYjM2TUV6UUx6K0tuRXlLZEhaUGU2dkhyQ2diOFpRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K`

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// to parse cookies sent with request
app.use(cors());

app.get('/', async (req, res) => {
    console.log('simple get')
    res.send('Working get')
});
app.post('/', async (req, res) => {
    console.log(req)
    console.log('simple post')
    res.send('Working post')
});

app.post('/token', async (req, res) => {
    const { token } = req.body
    const { signature, payload } = JSON.parse(atob(token))
    const stringifiedPayload = JSON.stringify(payload)

    console.log(signature, payload)

    const secretKey = 'f63b7daf2aefc760fa0af3078a51dfffc8bc63082405fc7c7479ed5863ce9d96d036e67b4a585d8f9da6b518c52dffa5'

    const expectedSignature = crypto.createHmac('sha256', secretKey)
        .update(stringifiedPayload)
        .digest('hex');

    console.log(signature, expectedSignature)
    if (expectedSignature === signature) {
        res.send('Working post')
    } else {
        res.send('Error')
    }
});


app.post('/jwt', async (req, res) => {
    console.log(req.body)
    try {
        // Verify the JWT
        const decoded = jwt.verify(req.body.jwtToken, jwtSecret);
        console.log('Decoded payload from Server 1:', decoded);
        res.send('Message received and verified successfully!');
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        res.status(401).send('Invalid token');
    }
});

app.post('/asymmetric', async (req, res) => {
    try {
        console.log(req.body)
        const { payload, signature } = req.body
        // Verify the JWT
        const verify = crypto.createVerify('RSA-SHA256');
        verify.update(JSON.stringify(payload)); // Add the same payload data
        verify.end();
        const isValid = verify.verify(atob(publicKey), signature, 'base64');

        if (!isValid) throw new Error('Signature do not match')

        console.log('Decoded payload from Server 1:', payload);
        res.send('Message received and verified successfully!');
    } catch (error) {
        console.error('Signature verification failed:', error.message);
        res.status(401).send('Invalid Signature');
    }
});

app.listen(PORT, () => {
    console.log('Server 1 is running on http://localhost:' + PORT);
});
