# Code.io

A text editor for the web built with Vanilla JS, Bootstrap, JQuery, Express.js,  Ace.js and JDoodle Compiler API. 

[www.code.io](https://codeio-editor.netlify.app/)

## Build Status

<a href="https://travis-ci.org/standard/standard"><img src="https://img.shields.io/travis/standard/standard/master.svg" alt="travis"></a>

## Code Style

<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>

## Screenshot

![image](https://user-images.githubusercontent.com/56535991/123550494-5ca9f400-d78b-11eb-864e-c43a2f4a0d90.png)

## Tech/Frameworks Used

**Built with**
- [Vanilla JS](https://reactjs.org/docs/getting-started.html)
- [Node](https://nodejs.org/dist/latest-v14.x/docs/api/)
- [Express](https://expressjs.com/)
- [JQuery](https://socket.io/docs/v3)
- [JDoodle](https://www.jdoodle.com/)
- [Ace](https://ace.c9.io/)
- [vs-code](https://code.visualstudio.com/docs)

## Installation

**Prerequisite** - Install [Node](https://nodejs.org/en/) and [VS-Code](https://code.visualstudio.com/Download) on your device.

Fork the project & fire up a terminal to enter the following command: 
```
$ git clone git@github.com:<username>/code.io.git
```
cd into the project folder using:
```
$ cd ./code.io/
```
To open the project in Visual Studio Code, enter:
```
$ code .
```
Open another tab in your terminal and cd into the client directory one tab and into the server directory on another, & run the following command in server directory:
```
$ npm i
```
This will install the required node modules to get you started. Also, please sign up on JDoodle to access their api with your own credentials and update the client_id and client_secret in server.js
Also update the request endpoints in /client/app.js as well as in server/server.js

Finally, run this command  to start the server.
```
$ npm start
```
## How to use?

- You can change font-size, language, and themes.
- The current version supports JavaScript, Java, C++ and Python 3
- Currently supported themes are terminal, textmate, monokai, twilight, dracula, github and tomorrow night blue.
- write your code and hit run and wait for a few seconds to see the response.
- User inputs should be seperated by ' | '

## Licence

This project is licensed under the terms of the MIT license.


