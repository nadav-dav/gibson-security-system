CSRF - Come in Dogfort!
-----------------------
![image](img/Castle.png)

The kittens have struck again, but let's show them who let the dogs out!

Defending against CSRF attacks is usually a system-wide effort.

You can read about it [here]("https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet").

### Defend!

We are going to add this behaviour:

1. All requests to all **"/services/messages"** endpoints, will have to have an **"csrfToken"** data sent with the request.

2. It will contain a string that is an encryption of the user's session. This should be calculated **server side** and be injected into the form.

3. When getting a request to one of the "/services" controllers, decrypt the token and see if it matches the user's session id. If not, return a 500 response.

4. This way, the attacker won't be able to mimic the POST request, since it does not know the token! Simple right?

> Most of the code is already implemented! Checkout the file `controllers/index.js` > `createCsrfToken` method for the token creation, and `controllers/services/index.js` > `csrfProtection` for the validation part.

I suggest you use [crypto-js](https://www.npmjs.org/package/crypto-js) to help you with encrypting/decrypting the token. It is already installed in your project as dependency, just use: 

```
var CryptoJS = require("crypto-js");
var passPhrase = "Secret Phassphrase";

var encrypted = CryptoJS.AES.encrypt("Message", passPhrase).toString();
var decrypted = CryptoJS.AES.decrypt(encrypted, passPhrase).toString(CryptoJS.enc.Utf8);

console.log('encrypted', encrypted);
console.log('decrypted', decrypted);
```


- - - 
#### This is getting REAL!
[Let's try some sql stuff!](10-SQLI.md)
