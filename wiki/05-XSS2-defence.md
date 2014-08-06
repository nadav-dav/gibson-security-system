XSS 2 - En garde!!
---------------------------------

![image](img/Armor.png)

(-_-)

They got us again.

Well, shame on us, we let them inject unsanitized data from the url, directly into the code! No no no.. **thats bad**..

### Refactor

Try to think of a better way to display the message without having it injected via url. One solution for example is to use enums, think about it.

> Hint: Look at `notify.dust`, `login.dust`, and `register.dust` files. There lays the logic of the "Welcome" message

.. 

..

As you realise, defending the system is all about sanitising input, and sending out just the right output. CONTROL YOUR DATA!

- - - 
#### Cool, now this page is safe again
[Do a little victory dance - an move on](06-XSS3.md)