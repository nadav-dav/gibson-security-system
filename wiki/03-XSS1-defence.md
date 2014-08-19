XSS 1 - Defence!
----------------------

![image](img/Shield_Security.png)

A malicious hacker is playing around in our system, stealing sessions! Bah!

We are going to stop the hacker from being able to get `document.cookie`!

> Some cookies **cannot be read via scripts**.

Here is a [step by step guide](http://lmgtfy.com/?q=protecting+your+cookies+from+appearing+in+%22document.cookie%22) explaining how to protect the sessions.

... 

...

..

### Prevent access to the cookie from the browser!
Go over the code and add the right patch to prevent cookies bleeding into the client side!

> Hint: Look at a file called `ExpressSessionHelper.js` and see where it sets the session cookie.

Think you got it? Restart the server to invalidate the sessions. Now try to hack it again using the previous method.

...

..

.

GOOD!

### Still not fixed - escape the data!

We have prevented the attacker from getting our precious user session, but scripts can still be injected into our page!

Let's handle the client side. We know our data has already been corrupted, so we'll need to handle it unsanitized.

* Find the [difference](http://stackoverflow.com/questions/1910794/what-is-the-difference-between-jquery-text-and-html) between jQuery's `.html()` and `.text()`. 

Got it? Well go on then; apply the change on your system! 

> Hint: Look at `timeline.dust` file and search for where the messages are created.

- - - 
#### Does it move? yes! should it? no! Duct tape[!](http://photos.foter.com/123/engineering-flowchart-does-it-move-wd40-vs-duct-tape-original-artist-unknown_l.jpg)
[Does it move? no! should it? yes! WD-40!](04-XSS2.md)