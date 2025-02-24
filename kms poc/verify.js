// Imports
const { KMSClient, VerifyCommand } = require("@aws-sdk/client-kms");
const fs = require('fs');

// Init KMS client
// Access using IAMs, we can have seperate IAMs with only role as sign and only role as
// TODO: ADD IAM CREDS
const client = new KMSClient({
    region: 'us-west-2',
    credentials: {
        accessKeyId: '',
        secretAccessKey: ''
    }
});

// Read data from file. In real world, we would get this from Network Call
const { payload, signature } = _readFromFile()
console.log(payload)
// payload.timestamp = 1;
// payload.expiry = 1;
console.log(payload)

// Input to KMS client
const input = {
    KeyId: "daa8e64b-1b8f-4c76-886e-c051f7c94f87",
    Message: Buffer.from(JSON.stringify(payload)),
    Signature: _stringToUint8Array(signature),
    MessageType: "RAW",
    SigningAlgorithm: "RSASSA_PSS_SHA_256",
};
const command = new VerifyCommand(input);

async function verifyPayload() {
    try {
        const response = await client.send(command);
        console.log(response)
        if (response.SignatureValid) {
            console.log('Signature Valid')
        }
    } catch (err) {
        console.log('Error Validating Signature')
        console.log(err)
    }
}

verifyPayload();

function _uint8ArrayToString(uint8Array) {
    const binaryString = String.fromCharCode(...new Uint8Array(uint8Array));
    return btoa(binaryString);
}

function _stringToUint8Array(base64String) {
    const binaryString = atob(base64String);
    const length = binaryString.length;
    const uint8Array = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
}

function _readFromFile() {
    try {
        const data = fs.readFileSync('data.txt', 'utf8');
        const jsonData = JSON.parse(atob(data));
        return jsonData
    } catch (err) {
        console.error('Error reading from file', err);
    }
}