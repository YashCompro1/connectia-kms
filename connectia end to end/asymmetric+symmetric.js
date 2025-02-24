const crypto = require('crypto');

// Secret key for encryption
const secretKey = Buffer.from('f63b7daf2aefc760fa0af3078a51dfffc8bc63082405fc7c7479ed5863ce9d96d036e67b4a585d8f9da6b518c52dffa5', 'hex');

// // Data to send
// const payload = {
//     "userID": "6adca7b76d0c436e96748c5008f3d361",
//     "productCode": "TGSHININGLIGHTS2",
//     "nonce": "48ab302e005c",
//     "expiry": "1735234839267"
// };

// const payloadStr = JSON.stringify(payload)

// // Encrypt the data
// const iv = crypto.randomBytes(16);
// const cipher = crypto.createCipheriv('aes-256-gcm', secretKey.subarray(0, 32), iv);
// let encryptedData = cipher.update(payloadStr, 'utf8', 'hex');
// encryptedData += cipher.final('hex');
// const authTag = cipher.getAuthTag().toString('hex');

// // Load private key
// const privateKey = `LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBcG5HbVc3bFVwQ2ljNEZOOHZQNjFBd0ZLSjR3YUJmbmFJdzhJaDZoajJYMzJyUk11ClNQdlV6ejhjMDlXelBuNElOc1A3NmhZTk1VcENFaFpZVFBIRGU2bjRVV2JqMUl5d1JaakRhME90SDVYa2hQalYKcGJGd0NWSTJtLzl6aEl6N1BCUmhTZFQyYTEweE9iM3lybUUrbGlzemRNTUg3K1I3U1A4SkZmUlpsaUo5d0NITwpHdFE5ZWFMNUdlSmpaNjlycXgrQmZFdDQwZGZHazNkN3hMYkJoOWNWVlRKWmQvYkNIcjNiRUNNVHRuTVZ6UFA5CkZPN0tTU1ZUWDFrVVlwV254YmR4WDJHY2VXOHh1ZjZGbjJDMXAyWjg5dDdlR2QvK3VqVVRIZHl0dy8yUnRmT3YKcVk5SUxiUmpiMzZNRXpRTHorS25FeUtkSFpQZTZ2SHJDZ2I4WlFJREFRQUJBb0lCQURBM1VoTFdNRS9SdUFoQQpCeTJVdDRra1VYLzlWUGlRTllIY2RBTWdZN1I0aWdIL1FYUkJCNWYxMTNzQ09BZU5hUUc4YW5pWVpMLzNuQVl6ClZPY05UaXkvdzBDSmhzeG02UlZ3T0lRVk9jeWhsbTV5eXlsUnFudjR4ZnNRMkR6NHZqcmNTSWFqMjdLa2I0TWoKcEc2aG13alRnUGQ5SEFxQmJMbHJzQTBkR09xbG9WY3IvbDlwYlhSWDh3M0YzTjN6QlJoUFZremZzZnhhWjN1bQovb01UbGl0azd4VlpqejJRSGlTUi9qQWhWbjdRYjY2eTE3dkppOEVPaTA2b1A0bDJ5dXFraFJjNnMvWVNqOVZCCkJWOGZZS0h0RGZTVyszVXhUZ0l5Tm8rN2pzeG0wY0JxRno5M2MrbzI2K2tLcGpiaXhMeWxJZ1RvMmNPeStBeVEKR09qOXJDMENnWUVBM1ZPRkZqTk5LS2hqSldBZ1dmY1lxRFNiUFBTWGlJbXZ1RDltbGEwck5YZXVCT0NzYko5eQo2ZXU4aWs5eGdqR205UGZQYU5mUld3Zm5Hb1p0T25zc2JITzNWLzFMeWxTZVhkbjlCSmZSeFNTZUJmbnVtcXJYCkJwZjJRanQ3ajlTKzEwTmx2bk4yTjdCSVFPSnFxWkNuMU9BNFIwUEhmN2wrMC80Wk1SNGVxanNDZ1lFQXdJVUgKSGFwSTF1YUNOL0hrOCtHQ0d0MHF3NU9jRDB1UUVCU2hHUmE0b3FuQ1RxZVE3eFVmUzd5NEFTQkc1aUYvNis2RwozRXBkeGtaTHNDQ0QvZ1RVVlNhQjdneENvSEdQdlhQOElQcU1veEQzVDVyb2hkUUZ1dlpNQlRlN3lya3FIMGUzCmhOdHlZU1RwMlFJUFo1RHNGK0JQQWt1cmNnTGRJR1lIUGFZVDZkOENnWUJSckJoWWNPWHdNdk1qUDYyd2hUWmMKRzgyTldOVHlWWnk2YU9yNklNVHBIaGpoUStkY3pob2hxQlFURmUzVkZXMSt5Rk9KWk5xa3RPM2JJKy82dktsUAovQU9VUEt4VEpaYXJHMTM2Nit0RXpKWmpyaThXZENTVkVrNlZjazNPYmJ0ZXhFZ3ZWM3d3WUtUSkRNUS9mbG53CmZDMUlYd0tuWjFRZDlvNWxTYkFYTVFLQmdRQ05jekEvUTVZeER6d3VEclRCMjdiVU5odnRoczdyRGdIVFR0VHUKc2hzR3FPUHpGbnNPcnQ1SHIya2lxcXhzK2NBYmdTM2xQVjZaQjUwazB6OG5yRFMyTzR6TGNvYWhpODZvekVjNwprOXN4Rkk0aEZ4Z3cvQThaeDAwanFFZDZNNElYYVlJVlE0ZE9pT2lvWVRNZ1RRS3FxRXhreTJRMGFKWS83N2J5ClBNdjAwUUtCZ1FETmFuZnFNVXgzVlFIOSswMXJ1UG4xU21oK2RnTGpqZTFvTWk4ZnYyaGo3ZG16NVYyOEJQU0kKa1N4cjA3bGVXQk9PRllzSndBbDFOUFlESy9DZEFTU3ptdGhYaE9LMncybGRQbTJKMHkrVS9hUVVDTTU4WGtadwpJcXcrZ3ZmeVFNU2xiMFFlL3c4bDlTRGlESzBtN2FDR2Z4cFB2aGZidWhMUEh6ZVhZMHRacHc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=`;


// // Sign the encrypted data
// const sign = crypto.createSign('SHA256');
// sign.update(encryptedData);
// sign.end();
// const signature = sign.sign(atob(privateKey), 'hex');

// // Send iv, encryptedData, authTag, and signature to App 2
// const finalPayload = { iv: iv.toString('hex'), encryptedData, authTag, signature };
// console.log(finalPayload);

/**
 * *****************************************************************************************************************
 */


const payload = {
    iv: 'e0ac08ee082b00674b051b6d495e53d8',
    encryptedData: 'f2520b7488ca54201b97180292f5bc160a583b86188f58169ad8046a81f74c55f2e9d51323aaad03b86d7c9bf4e9742926ce9bc11e20d87ea0815639b1083b352f63646701be33b5f82aa2a4d6e253adddfb4902f120d6fc16ba66633be4e3d2847bd1723a8eddbdecbbb7139b06530336fc4aeefe7b7427fcdac0d95f80',
    authTag: 'a6d9220dafd7b29bb6b2742d3364071e',
    signature: '7ca66271e59efb82aa9dfd3c0ef04ac9b0cd5ccff6f289cef05079e85e53029caa5830934f84c36bbf4875a61a788cb94f4b87dfd3cd5f57a993c5c484331ef1af8efdb7f3edbcba3183af2cf5dc324c3618ace05233432faca24d7b4ddc77ed3bafc3e0ea6cb97d9a6ce371da9ae297cf5389d784aceeacb6b81e9614e189829075e5f39d274fb83d10fd618fef0d2a3519f4060b69446fa44db898fdd8dcf2dc41cf4fac98a265d5058a7d1826e1027945ff5780b7189e96993afe98e60f8a9f175cec00922adbd78de469604044f9df39fced6cb3dc6656555ff9d553aa017162d7c6a3aa5f6394a202cbccd88a65ca68749ff08f9abcc8aa0c2c5de8f8ef'
}

const { iv, encryptedData, authTag, signature } = payload;

// Load public key
const publicKey = `LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJDZ0tDQVFFQXBuR21XN2xVcENpYzRGTjh2UDYxQXdGS0o0d2FCZm5hSXc4SWg2aGoyWDMyclJNdVNQdlUKeno4YzA5V3pQbjRJTnNQNzZoWU5NVXBDRWhaWVRQSERlNm40VVdiajFJeXdSWmpEYTBPdEg1WGtoUGpWcGJGdwpDVkkybS85emhJejdQQlJoU2RUMmExMHhPYjN5cm1FK2xpc3pkTU1INytSN1NQOEpGZlJabGlKOXdDSE9HdFE5CmVhTDVHZUpqWjY5cnF4K0JmRXQ0MGRmR2szZDd4TGJCaDljVlZUSlpkL2JDSHIzYkVDTVR0bk1WelBQOUZPN0sKU1NWVFgxa1VZcFdueGJkeFgyR2NlVzh4dWY2Rm4yQzFwMlo4OXQ3ZUdkLyt1alVUSGR5dHcvMlJ0Zk92cVk5SQpMYlJqYjM2TUV6UUx6K0tuRXlLZEhaUGU2dkhyQ2diOFpRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K`
const publicKey1 = `LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJDZ0tDQVFFQTRFZ3FsOEtTd2VNMnBFdlQ3bXJkSkx6UHVCZUU2TFJ4Ni95eGdnMXg4T0tLQktOWlc4eGIKWDNLa056WlQvS1VQTWkzWXZocy9ZaWtsa1NOL2p6dEVMcDlzendsekZCUXRpUHdHOTBNOEV3SFFpQnREOEVUSApPbW0rdVpFcWllVWpuUzByUHFjVEN4SWdYNzVuMml4WE5yOHVpR1UzaklXbktCOHJBZzJhV0svNnlyc3duZjRxCmdKaDBZMGEzR0hPdHFiRllrY0tIMkF6ekNZc2h2a3ZxaXZLSmo2eG00RGNhaTh6ekZrQ0p2NUJMd1BMRkZybmkKQzRrUFRFeXQyRHJhWHdvMFFVd0xmdTZZQ2tQeFE2NVRIaWhzemVRLzFYNC8wVGlQTnVEbzNGaEY5RDJMczB6SwpVMDFoTUZseXBHL1VMalNzL1pFWFQwVitzc0t6QUtXZytRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K`

// Verify the signature
const verify = crypto.createVerify('SHA256');
verify.update(encryptedData);
verify.end();
const isVerified = verify.verify(atob(publicKey), signature, 'hex');

if (!isVerified) {
  throw new Error('Signature verification failed!');
}

// Decrypt the data
const decipher = crypto.createDecipheriv('aes-256-gcm', secretKey.slice(0, 32), Buffer.from(iv, 'hex'));
decipher.setAuthTag(Buffer.from(authTag, 'hex'));
let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
decryptedData += decipher.final('utf8');

console.log('Decrypted Data:', JSON.parse(decryptedData));
