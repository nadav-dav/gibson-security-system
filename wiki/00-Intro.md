HACK THE GIBSON!
----------------------
![image](img/ele_ice.png)

Welcome welcome boys and girls!

The Gibson is the no. 1 social network ever created!

It is designed to work flawlessly and always be **SUUUPER secured**!

### Disclaimer
All the things you are going to learn here are REAL.

I mean, these are real attacks that actually happen all the time. So with that in mind, don't go and try these methods on applications other than your own - it is illegal and you could get caught. 

### TO Begin
1. Download and install [NodeJs](http://nodejs.org/) (if you haven't already)
2. Clone the repo from `git@github.com:nadav-dav/gibson-security-system.git`
3. Using your terminal, navigate to the downloaded folder and type `sudo npm start`
4. You will be working in pairs, decide which one of you is going to be the attacker, and which one will be the defender!
	- run `./my-ip.sh` to get both of your local ips.
	- exchange your ip with you group mate
	- open `sudo nano /etc/hosts` and add 2 lines at the end (just **change the ip addresses**):

	```
	172.31.8.111  	www.gibson.com		# defender's ip
	172.31.8.222  	www.attacker.com	# attacker's ip
	```
	- hit `ctrl+x` and then `enter` to save the file
5. You now have server running! Open it [here!](http://gibson.com/)
6. Create users, and start posting messages!

- - -

After you've posted some messages, you can go on and move to the [next step](01-Tools.md)
