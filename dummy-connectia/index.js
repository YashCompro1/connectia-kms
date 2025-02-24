const express = require("express");
const app = express();
const PORT = 4000;
const cookieParser = require("cookie-parser");
const crypto = require('crypto');

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// to parse cookies sent with request
app.use(cookieParser());

function _generateNonce(length = 16) {
    return crypto.randomBytes(length).toString('hex');
}

// dummy_payload
// let x = {
//     "payload": {
//         "userId": "6adca7b76d0c436e96748c5008f3d361",
//         "productId": "TGSHININGLIGHTS2",
//         "expiry": 1735531979905
//     },
//     "signature": "FIQ9CANgmlrH9EpvgURB7N+iefg9FZZWvLCwrI/c1p2UYW3cb1om7YUmKBD94GOsfJchFTfZlL7SkHk6hyoOPvlJXHaDU6/3o6eVUsPvrMPCzyhHijzmgqw844aLMzAFx2xK0+VAGjamzITo08nR4RJhf+dQwJkN3iuS3BPS3Dtnb2oR7lN800SP2YQfNSBa/F0MUr2AxV4dsBI30EXl8YalgAXLM8vb90peJTtyDYmu42nijLjim6i8N7IJ55ZS5GZURTHpKXITSxEAqQpEHr+3HWiy2UWzZYWBiBEJE+hXaIc07kYxfqSPFYlhWz84s7zfzMzFOCp+US2HQrXaWw=="
// }

async function _validateEncryptionMiddleware(req, res, next) {
    try {

        const { payload: token } = req.body
        const { payload, signature } = JSON.parse(atob(token))
        const publicKey = `LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFwdzF6dzZFNlFYM3gvZzhTOE5iMwo4d3BPMm9yWm1QeCt0N05vYkZWQzNKUmNCcVpLNVpDZU80cnh5aDdSMUpuc0tmSElRajIwVmRPQzUvYzd3aDk4Cjd6QVJpd3hoSndlRzVrTDYrRHdMYjdJQldsZ3JkRk4rOG92V0ljcTJqMFhuWkF3Sy9DWWZickxqN0dDL2l4cWUKV1huRGthbUpScEw4NjRhSFhLUXlsUzdoL2FCVUVyZ3FKWWxxbG5NOVNZSStjeTZNeXUwNjRydU5sWHdXMlUwcQpZbmU4TllMdytUMmlZbmxRSW5vd3NEUnRzZjhTU2cyaFFvNGdFbHVHMmxvLzBxMTZFOGZ6NitUVzZnMjlSUWJYCmhaNFJKVUxaV3NwdjdvU1BGamtLb09DREcyRHJxRVoxYzNLcnRYVThSdWF2OHhQcTFvL0ROMGdlQ25rRHI3RysKQVFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t`

        const verify = crypto.createVerify('RSA-SHA256');
        verify.update(JSON.stringify(payload));
        verify.end();

        const isValid = verify.verify(atob(publicKey), signature, 'base64');

        if (!isValid) {
            return res.status(401).send('Invalid Signature');
        }

        if (Date.now() - payload.expiry > 0) {
            return res.status(401).send('Expired token');
        }

        next()
    } catch (e) {
        console.log(e)
        return res.status(500).send('Internal Server Error');

    }
}

app.get('/', (req, res) => {
    res.send('working')
});

app.post("/connectia", _validateEncryptionMiddleware, (req, res) => {
    const { payload } = JSON.parse(atob(token))
    const data = new URLSearchParams({
        user: payload.userId,
        product: payload.productId,
        key: payload.key
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