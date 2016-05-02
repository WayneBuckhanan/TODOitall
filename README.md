![Alt text](logo.png)

An Offline-first TODO single page angular app with back-end user authentication and data storing
___
## Developers
Jeffery Egly  
Jonathan Thall  
William Brownson  
Charles Lambert
Wayne Buckhanan

## Built with
* [AngularJS](https://angularjs.org/) - A JavaScript web framework
* [CouchDB](http://couchdb.apache.org/) - a NOSQL Database
* [Angular Material](https://material.angularjs.org/latest/) - A CSS framework created as a reference design of Google's material design
* [PouchDB](https://pouchdb.com/) - A front end database and API built to sync with CouchDB
## Requirements

## Setup
### NPM

Windows - Download and run the Windows installer [here](https://nodejs.org/en/download/)

Linux - Follow the guide [here](http://docs.couchdb.org/en/1.6.1/install/unix.html)

Mac - Download and run the Windows installer [here](http://docs.couchdb.org/en/1.6.1/install/mac.html)

### Bower
After you have installed NPM simple run `npm install bower`

### Compass
You will need to install compass which is a ruby gem  
Run `ruby gem install compass`
### CouchDB

Windows - Follow the CouchDB installation guide [here](http://docs.couchdb.org/en/1.6.1/install/windows.html#)

Linux - Follow the CouchDB installation guide [here](http://docs.couchdb.org/en/1.6.1/install/windows.html#)

Mac - Follow the CouchDB installation guide [here](http://docs.couchdb.org/en/1.6.1/install/windows.html#)

To setup CouchDB first follow this guide [here](https://www.digitalocean.com/community/tutorials/how-to-install-couchdb-and-futon-on-ubuntu-14-04)

Next we need to add CORS

Install CORS script

`npm install -g add-cors-to-couchdb`

Next run it

`add-cors-to-couchdb`

### App
Finally to download the app we will clone the repository from git with this command `git clone https://github.com/WayneBuckhanan/TODOitall.git`
then cd into the app directory and run `sudo npm install && bower install`

## Operation
To run a live preview of the app simply run `grunt`
