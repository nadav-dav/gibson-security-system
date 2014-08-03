CSRF - Cute kitten attack!
----------------------------

![image](img/FireFox.png)

Are you ready you'll? we are **DONE with XSS**!

If you want to practice this stuff some more, I have added a bunch of resources to the addendum - and I encourage you to check them out!

Now ..

### New kind of attack

We are going to launch a [CSRF](https://www.owasp.org/index.php/Cross-Site_Request_Forgery) (Cross Site Request Forgery) attack!

Basically, this attack consists of creating requests from the user's machine, thus taking advantage of the fact that he is logged in, and doing stuff on his behalf.

With this attack we are going to make our victim post stuff, without his knowledge.

### How?
1. Pop open `Charles` and try **figure out what's going on** when sending a message!
2. Open [this page](https://encrypted.google.com/search?tbm=isch&q=cute%20kitten&tbs=imgo:1#q=cute+kittens&tbm=isch&tbs=imgo:1) and select a cute kitten.
3. Create a webpage, containing the cute kitten image, and add a diabolic script that will mimic the behaviour you traced in the first step to make any victim that visits your page to post this message: 
```
OH my god! so cute! mew! [http://attacker.com:3000/kitten.html]
```
4. ???
5. PROFIT!

- - - 
#### Cat? (ding) I'm a kitty cat[!](https://www.youtube.com/watch?v=CNP5erCmYcQ)
[and I dance dance dance, and I dance dance dance!](09-CSRF-defence.md)