const crypto = require('crypto');
const fs = require('fs');

// Generate keys
const { publicKey: publicKeyCup, privateKey: privateKeyCup } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
});

// Save keys to files
fs.writeFileSync('public_key_cu1p.pem', publicKeyCup);
fs.writeFileSync('private_key_c1up.pem', privateKeyCup);

// Generate keys
const { publicKey: publicKeyConnectia, privateKey: privateKeyConnectia } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
});

// Save keys to files
fs.writeFileSync('public_key_connecti1a.pem', btoa(publicKeyConnectia));
fs.writeFileSync('private_key_connec1tia.pem', btoa(privateKeyConnectia));


console.log('Keys generated and saved.');
