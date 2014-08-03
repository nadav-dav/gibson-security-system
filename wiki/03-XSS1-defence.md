XSS 1 - Defence!
----------------------

![image](img/Shield_Security.png)

A malicious hacker is playing around in our system, stealing sessions! Bah!

We are going to stop the hacker form being able to get `document.cookie`!

> Some cookies **cannot be read via scripts**.

Here is a [step by step guide](http://lmgtfy.com/?q=you+didn%27t+think+i+would+make+it+this+easy+right%3F+search+for+it!) explaining how to protect the sessions.

... 

...

..

### Fix it!
Go over the code, and add the right patch to prevent cookies bleeding into the client side!

Think you got it? restart the server to invalidate the sessions. and now try to hack it again using the previews method.

...

..

.

GOOD!

### Still not fixed!

We have prevented the attacker from getting our precious user session, but scripts can still be injected into our page!

Let's handle the client side.. we know our data is already corrupted, so we'll need to handle it unsanitized.

* Find the [difference](http://stackoverflow.com/questions/1910794/what-is-the-difference-between-jquery-text-and-html) between jQuery's `.html()` and `.text()`. 

Got it? well go on than! apply the change on your system! 

- - - 
#### Does it move? yes! should it? no! Duct tape[!](http://photos.foter.com/123/engineering-flowchart-does-it-move-wd40-vs-duct-tape-original-artist-unknown_l.jpg)
[Does it move? no! should it? yes! WD-40!](04-XSS2.md)