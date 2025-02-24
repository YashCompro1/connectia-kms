const jwt = require('jsonwebtoken');
const secretKey = 'f63b7daf2aefc760fa0af3078a51dfffc8bc63082405fc7c7479ed5863ce9d96d036e67b4a585d8f9da6b518c52dffa5';

const payload = {
    "userID": "6adca7b76d0c436e96748c5008f3d361",
    "productCode": "TGSHININGLIGHTS2",
    "expiry": "1735234839267"
};

// Create and sign the JWT token
const token = jwt.sign(payload, secretKey, {
    expiresIn: '30s'
});

// Output the JWT token
console.log('Generated JWT Token:', token);

try {
    // Verify the JWT token
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded JWT:', decoded);  // If valid, it returns the decoded payload

} catch (error) {
    if (error.name === 'TokenExpiredError') {
        console.log('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
        console.log('Invalid token');
    } else {
        console.log('Token verification failed:', error);
    }
}


try {
    // Verify the JWT token
    const decoded = jwt.verify(token+'1', secretKey);
    console.log('Decoded JWT:', decoded);  // If valid, it returns the decoded payload

} catch (error) {
    if (error.name === 'TokenExpiredError') {
        console.log('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
        console.log('Invalid token');
    } else {
        console.log('Token verification failed:', error);
    }
}