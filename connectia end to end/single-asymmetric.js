const crypto = require('crypto');

// Sample payload
const payload = {
    "userID": "6adca7b76d0c436e96748c5008f3d361",
    "productCode": "TGSHININGLIGHTS2",
    "nonce": "48ab302e005c",
    "expiry": "1735234839267"
};

// Convert the payload to a string (you could use JSON.stringify if needed)
const payloadString = JSON.stringify(payload);

// Your private key (should be securely stored, not hardcoded in production)
const privateKey = `LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBcG5HbVc3bFVwQ2ljNEZOOHZQNjFBd0ZLSjR3YUJmbmFJdzhJaDZoajJYMzJyUk11ClNQdlV6ejhjMDlXelBuNElOc1A3NmhZTk1VcENFaFpZVFBIRGU2bjRVV2JqMUl5d1JaakRhME90SDVYa2hQalYKcGJGd0NWSTJtLzl6aEl6N1BCUmhTZFQyYTEweE9iM3lybUUrbGlzemRNTUg3K1I3U1A4SkZmUlpsaUo5d0NITwpHdFE5ZWFMNUdlSmpaNjlycXgrQmZFdDQwZGZHazNkN3hMYkJoOWNWVlRKWmQvYkNIcjNiRUNNVHRuTVZ6UFA5CkZPN0tTU1ZUWDFrVVlwV254YmR4WDJHY2VXOHh1ZjZGbjJDMXAyWjg5dDdlR2QvK3VqVVRIZHl0dy8yUnRmT3YKcVk5SUxiUmpiMzZNRXpRTHorS25FeUtkSFpQZTZ2SHJDZ2I4WlFJREFRQUJBb0lCQURBM1VoTFdNRS9SdUFoQQpCeTJVdDRra1VYLzlWUGlRTllIY2RBTWdZN1I0aWdIL1FYUkJCNWYxMTNzQ09BZU5hUUc4YW5pWVpMLzNuQVl6ClZPY05UaXkvdzBDSmhzeG02UlZ3T0lRVk9jeWhsbTV5eXlsUnFudjR4ZnNRMkR6NHZqcmNTSWFqMjdLa2I0TWoKcEc2aG13alRnUGQ5SEFxQmJMbHJzQTBkR09xbG9WY3IvbDlwYlhSWDh3M0YzTjN6QlJoUFZremZzZnhhWjN1bQovb01UbGl0azd4VlpqejJRSGlTUi9qQWhWbjdRYjY2eTE3dkppOEVPaTA2b1A0bDJ5dXFraFJjNnMvWVNqOVZCCkJWOGZZS0h0RGZTVyszVXhUZ0l5Tm8rN2pzeG0wY0JxRno5M2MrbzI2K2tLcGpiaXhMeWxJZ1RvMmNPeStBeVEKR09qOXJDMENnWUVBM1ZPRkZqTk5LS2hqSldBZ1dmY1lxRFNiUFBTWGlJbXZ1RDltbGEwck5YZXVCT0NzYko5eQo2ZXU4aWs5eGdqR205UGZQYU5mUld3Zm5Hb1p0T25zc2JITzNWLzFMeWxTZVhkbjlCSmZSeFNTZUJmbnVtcXJYCkJwZjJRanQ3ajlTKzEwTmx2bk4yTjdCSVFPSnFxWkNuMU9BNFIwUEhmN2wrMC80Wk1SNGVxanNDZ1lFQXdJVUgKSGFwSTF1YUNOL0hrOCtHQ0d0MHF3NU9jRDB1UUVCU2hHUmE0b3FuQ1RxZVE3eFVmUzd5NEFTQkc1aUYvNis2RwozRXBkeGtaTHNDQ0QvZ1RVVlNhQjdneENvSEdQdlhQOElQcU1veEQzVDVyb2hkUUZ1dlpNQlRlN3lya3FIMGUzCmhOdHlZU1RwMlFJUFo1RHNGK0JQQWt1cmNnTGRJR1lIUGFZVDZkOENnWUJSckJoWWNPWHdNdk1qUDYyd2hUWmMKRzgyTldOVHlWWnk2YU9yNklNVHBIaGpoUStkY3pob2hxQlFURmUzVkZXMSt5Rk9KWk5xa3RPM2JJKy82dktsUAovQU9VUEt4VEpaYXJHMTM2Nit0RXpKWmpyaThXZENTVkVrNlZjazNPYmJ0ZXhFZ3ZWM3d3WUtUSkRNUS9mbG53CmZDMUlYd0tuWjFRZDlvNWxTYkFYTVFLQmdRQ05jekEvUTVZeER6d3VEclRCMjdiVU5odnRoczdyRGdIVFR0VHUKc2hzR3FPUHpGbnNPcnQ1SHIya2lxcXhzK2NBYmdTM2xQVjZaQjUwazB6OG5yRFMyTzR6TGNvYWhpODZvekVjNwprOXN4Rkk0aEZ4Z3cvQThaeDAwanFFZDZNNElYYVlJVlE0ZE9pT2lvWVRNZ1RRS3FxRXhreTJRMGFKWS83N2J5ClBNdjAwUUtCZ1FETmFuZnFNVXgzVlFIOSswMXJ1UG4xU21oK2RnTGpqZTFvTWk4ZnYyaGo3ZG16NVYyOEJQU0kKa1N4cjA3bGVXQk9PRllzSndBbDFOUFlESy9DZEFTU3ptdGhYaE9LMncybGRQbTJKMHkrVS9hUVVDTTU4WGtadwpJcXcrZ3ZmeVFNU2xiMFFlL3c4bDlTRGlESzBtN2FDR2Z4cFB2aGZidWhMUEh6ZVhZMHRacHc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=`;

// Sign the payload
const sign = crypto.createSign('RSA-SHA256');
sign.update(payloadString); // Add the payload to the signer
sign.end();


// Create the signature
const signature = sign.sign(atob(privateKey), 'base64');  // You can use 'hex' or 'base64' encoding
console.log('Signature:', signature);

/**
 * *****************************************************************************************
 */

payload.nonce = '48ab302e005'
const payloadStringBE = JSON.stringify(payload);

const publicKey = `LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJDZ0tDQVFFQXBuR21XN2xVcENpYzRGTjh2UDYxQXdGS0o0d2FCZm5hSXc4SWg2aGoyWDMyclJNdVNQdlUKeno4YzA5V3pQbjRJTnNQNzZoWU5NVXBDRWhaWVRQSERlNm40VVdiajFJeXdSWmpEYTBPdEg1WGtoUGpWcGJGdwpDVkkybS85emhJejdQQlJoU2RUMmExMHhPYjN5cm1FK2xpc3pkTU1INytSN1NQOEpGZlJabGlKOXdDSE9HdFE5CmVhTDVHZUpqWjY5cnF4K0JmRXQ0MGRmR2szZDd4TGJCaDljVlZUSlpkL2JDSHIzYkVDTVR0bk1WelBQOUZPN0sKU1NWVFgxa1VZcFdueGJkeFgyR2NlVzh4dWY2Rm4yQzFwMlo4OXQ3ZUdkLyt1alVUSGR5dHcvMlJ0Zk92cVk5SQpMYlJqYjM2TUV6UUx6K0tuRXlLZEhaUGU2dkhyQ2diOFpRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K`
const publicKey1 = `LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJDZ0tDQVFFQTRFZ3FsOEtTd2VNMnBFdlQ3bXJkSkx6UHVCZUU2TFJ4Ni95eGdnMXg4T0tLQktOWlc4eGIKWDNLa056WlQvS1VQTWkzWXZocy9ZaWtsa1NOL2p6dEVMcDlzendsekZCUXRpUHdHOTBNOEV3SFFpQnREOEVUSApPbW0rdVpFcWllVWpuUzByUHFjVEN4SWdYNzVuMml4WE5yOHVpR1UzaklXbktCOHJBZzJhV0svNnlyc3duZjRxCmdKaDBZMGEzR0hPdHFiRllrY0tIMkF6ekNZc2h2a3ZxaXZLSmo2eG00RGNhaTh6ekZrQ0p2NUJMd1BMRkZybmkKQzRrUFRFeXQyRHJhWHdvMFFVd0xmdTZZQ2tQeFE2NVRIaWhzemVRLzFYNC8wVGlQTnVEbzNGaEY5RDJMczB6SwpVMDFoTUZseXBHL1VMalNzL1pFWFQwVitzc0t6QUtXZytRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K`

// Verify the signature using the public key
const verify = crypto.createVerify('RSA-SHA256');
verify.update(payloadStringBE); // Add the same payload data
verify.end();

// Check if the signature is valid
const isValid = verify.verify(atob(publicKey), signature, 'base64'); // Signature encoding must match

if (isValid) {
    console.log('Signature is valid!');
    console.log('Payload:', payload);  // Access the data
} else {
    console.log('Signature is invalid!');
}
