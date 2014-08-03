SQLI - Defence!
----------------------------
![image](img/Hero.png)
![image](img/Heroine.png)

What can we learn from little Bobby's mom?

When handling SQL strings, we need to be very (!) carful about what we put into the query.

### What not to do?
**DO NOT** try to sanitize the data yourself!

Most of the SQL connection tools will have data sanitisers built in - use it!

### Fix it

Look inside `UsersDao.js` , find the faulty query and fix it.

You can see an example on how it should be used in other queries within the file.



- - - 
#### Done!
[Continue](12-Addendum.md)