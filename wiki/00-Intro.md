HACK THE GIBSON!
----------------------
![image](img/ele_ice.png)

Welcome welcome boys and girls!

The Gibson is the no. 1 social network ever created!

It is designed to work flawlessly and always be **SUUUPER secured**!

### Disclaimer
All the things you are going to learn here are REAL.

I mean, these are real attacks that actually happen all the time. So with that in mind, don't go and try these methods on applications other than your own - it is illegal and you could get caught. 

### Pair up!
Find your significant other, I mean, your team mate.

Choose which of your machines should run the **Gibson** app, and which should be the **attacking machine**.

### Setup (on both of your machines)
1. Download and install [NodeJs](http://nodejs.org/) (if you haven't already)
2.	- run `./gibson-ip.sh` or `./attacker-ip.sh` to get both of your local ips.
	- exchange your ip with you group mate.
	- open `sudo nano /etc/hosts` and add the two lines at the end. for example, it should look something like this:
	
	```
	##
	# Host Database
	#
	# localhost is used to configure the loopback interface
	# when the system is booting.  Do not change this entry.
	##
	127.0.0.1	     localhost
	255.255.255.255	 broadcasthost
	::1              localhost
	fe80::1%lo0	     localhost
	#
	# gibson EXAMPLE!
	#
	172.31.8.111  	www.gibson-sec.com 	# gibson's ip
	172.31.8.222  	www.attacker.com	# attacker's ip
	```
	- hit `ctrl+x` and then `enter` to save the file
3. Clone the repo from `git@github.com:nadav-dav/gibson-security-system.git`

### Setting up the Gibson machine 
4. Navigate to the cloned folder `cd gibson-security-system` 
5. Run **`sudo npm start`**

### Setting up the attacking machine
3. To install it type `sudo npm install serve -g`
4. To run it just type `serve` in your console.

You now have server running! Open it [here!](http://www.gibson-sec.com/)

- - -
Create users, and start posting messages!

After you've posted some messages, you can go on and move to the [next step](01-Tools.md)
