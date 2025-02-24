// Things to know
// Cost - https://aws.amazon.com/kms/pricing/
// Policies
// IAM users
// Public and private key
// AWS managed and not compro managed
// Could be C1 managed
// Key rotation



// Imports
const { KMSClient, SignCommand } = require("@aws-sdk/client-kms");
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

// Dummy Payload
const payload = {
    "userID": "6adca7b76d0c436e96748c5008f3d361",
    "productCode": "TGSHININGLIGHTS2",
    "nonce": "48ab302e005c",
    "expiry": "1735234839267"
};
const messageBuffer = Buffer.from(JSON.stringify(payload));

// Input to KMS client
const input = {
    KeyId: "daa8e64b-1b8f-4c76-886e-c051f7c94f87",
    Message: messageBuffer,
    MessageType: "RAW",
    SigningAlgorithm: "RSASSA_PSS_SHA_256",
};
const command = new SignCommand(input);

async function signPayload() {
    try {
        const response = await client.send(command);
        const signature = _uint8ArrayToString(response.Signature)
        _writeToFile(btoa(JSON.stringify({ payload, signature })))
    } catch (err) {
        console.error('Error signing the payload:', err);
    }
}

signPayload();

// Helper functions
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

function _writeToFile(data) {
    // Write JSON to file
    try {
        fs.writeFileSync('data.txt', data);
        console.log('Written to file successfully');
    } catch (err) {
        console.error('Error writing to file', err);
    }
}