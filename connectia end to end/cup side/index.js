// CUP side
const axios = require('axios');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const jwtSecret = "f63b7daf2aefc760fa0af3078a51dfffc8bc63082405fc7c7479ed5863ce9d96d036e67b4a585d8f9da6b518c52dffa5"
const privateKey = `LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBcG5HbVc3bFVwQ2ljNEZOOHZQNjFBd0ZLSjR3YUJmbmFJdzhJaDZoajJYMzJyUk11ClNQdlV6ejhjMDlXelBuNElOc1A3NmhZTk1VcENFaFpZVFBIRGU2bjRVV2JqMUl5d1JaakRhME90SDVYa2hQalYKcGJGd0NWSTJtLzl6aEl6N1BCUmhTZFQyYTEweE9iM3lybUUrbGlzemRNTUg3K1I3U1A4SkZmUlpsaUo5d0NITwpHdFE5ZWFMNUdlSmpaNjlycXgrQmZFdDQwZGZHazNkN3hMYkJoOWNWVlRKWmQvYkNIcjNiRUNNVHRuTVZ6UFA5CkZPN0tTU1ZUWDFrVVlwV254YmR4WDJHY2VXOHh1ZjZGbjJDMXAyWjg5dDdlR2QvK3VqVVRIZHl0dy8yUnRmT3YKcVk5SUxiUmpiMzZNRXpRTHorS25FeUtkSFpQZTZ2SHJDZ2I4WlFJREFRQUJBb0lCQURBM1VoTFdNRS9SdUFoQQpCeTJVdDRra1VYLzlWUGlRTllIY2RBTWdZN1I0aWdIL1FYUkJCNWYxMTNzQ09BZU5hUUc4YW5pWVpMLzNuQVl6ClZPY05UaXkvdzBDSmhzeG02UlZ3T0lRVk9jeWhsbTV5eXlsUnFudjR4ZnNRMkR6NHZqcmNTSWFqMjdLa2I0TWoKcEc2aG13alRnUGQ5SEFxQmJMbHJzQTBkR09xbG9WY3IvbDlwYlhSWDh3M0YzTjN6QlJoUFZremZzZnhhWjN1bQovb01UbGl0azd4VlpqejJRSGlTUi9qQWhWbjdRYjY2eTE3dkppOEVPaTA2b1A0bDJ5dXFraFJjNnMvWVNqOVZCCkJWOGZZS0h0RGZTVyszVXhUZ0l5Tm8rN2pzeG0wY0JxRno5M2MrbzI2K2tLcGpiaXhMeWxJZ1RvMmNPeStBeVEKR09qOXJDMENnWUVBM1ZPRkZqTk5LS2hqSldBZ1dmY1lxRFNiUFBTWGlJbXZ1RDltbGEwck5YZXVCT0NzYko5eQo2ZXU4aWs5eGdqR205UGZQYU5mUld3Zm5Hb1p0T25zc2JITzNWLzFMeWxTZVhkbjlCSmZSeFNTZUJmbnVtcXJYCkJwZjJRanQ3ajlTKzEwTmx2bk4yTjdCSVFPSnFxWkNuMU9BNFIwUEhmN2wrMC80Wk1SNGVxanNDZ1lFQXdJVUgKSGFwSTF1YUNOL0hrOCtHQ0d0MHF3NU9jRDB1UUVCU2hHUmE0b3FuQ1RxZVE3eFVmUzd5NEFTQkc1aUYvNis2RwozRXBkeGtaTHNDQ0QvZ1RVVlNhQjdneENvSEdQdlhQOElQcU1veEQzVDVyb2hkUUZ1dlpNQlRlN3lya3FIMGUzCmhOdHlZU1RwMlFJUFo1RHNGK0JQQWt1cmNnTGRJR1lIUGFZVDZkOENnWUJSckJoWWNPWHdNdk1qUDYyd2hUWmMKRzgyTldOVHlWWnk2YU9yNklNVHBIaGpoUStkY3pob2hxQlFURmUzVkZXMSt5Rk9KWk5xa3RPM2JJKy82dktsUAovQU9VUEt4VEpaYXJHMTM2Nit0RXpKWmpyaThXZENTVkVrNlZjazNPYmJ0ZXhFZ3ZWM3d3WUtUSkRNUS9mbG53CmZDMUlYd0tuWjFRZDlvNWxTYkFYTVFLQmdRQ05jekEvUTVZeER6d3VEclRCMjdiVU5odnRoczdyRGdIVFR0VHUKc2hzR3FPUHpGbnNPcnQ1SHIya2lxcXhzK2NBYmdTM2xQVjZaQjUwazB6OG5yRFMyTzR6TGNvYWhpODZvekVjNwprOXN4Rkk0aEZ4Z3cvQThaeDAwanFFZDZNNElYYVlJVlE0ZE9pT2lvWVRNZ1RRS3FxRXhreTJRMGFKWS83N2J5ClBNdjAwUUtCZ1FETmFuZnFNVXgzVlFIOSswMXJ1UG4xU21oK2RnTGpqZTFvTWk4ZnYyaGo3ZG16NVYyOEJQU0kKa1N4cjA3bGVXQk9PRllzSndBbDFOUFlESy9DZEFTU3ptdGhYaE9LMncybGRQbTJKMHkrVS9hUVVDTTU4WGtadwpJcXcrZ3ZmeVFNU2xiMFFlL3c4bDlTRGlESzBtN2FDR2Z4cFB2aGZidWhMUEh6ZVhZMHRacHc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=`;

const payload = {
    "userID": "6adca7b76d0c436e96748c5008f3d361",
    "productCode": "TGSHININGLIGHTS2",
    "nonce": "48ab302e005c",
    "expiry": "1735234839267"
}

async function jwtApproach() {
    try {
        const jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
        const response = await axios.post('http://localhost:3001/jwt', { jwtToken });
        console.log(response.data)
    } catch (error) {
        console.log(error)
        console.error('Error sending request to Server 2:', error.message);
    }
}

async function asymmetricApproach() {

    const payloadString = JSON.stringify(payload);
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(payloadString);
    sign.end();
    const signature = sign.sign(atob(privateKey), 'base64');

    try {
        const response = await axios.post('http://localhost:3001/asymmetric', { payload, signature });
        console.log(response.data)
    } catch (error) {
        console.log(error)
        console.error('Error sending request to Server 2:', error.message);
    }
}

// jwtApproach()
asymmetricApproach()