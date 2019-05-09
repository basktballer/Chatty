Chatty App
=====================

A React and Websockets based chat client.

### Screenshots
!['Screenshot Of User 1 Message 1'](https://github.com/basktballer/Chatty/blob/master/docs/user1message1.png)

!['Screenshot Of User 2 Message 1'](https://github.com/basktballer/Chatty/blob/master/docs/user2message1.png)

!['Screenshot Of User 1 Message 2 image link'](https://github.com/basktballer/Chatty/blob/master/docs/user1message2.png)


### Usage

Clone the repo and create your own git repo.

```
git clone git@github.com:basktballer/Chatty.git
```

Install the dependencies on both the client and server. Start both the React client and Websocket server.

```
#Install dependencies and start the Chatty App React Client
npm install
npm start
open http://localhost:3000
```

```
#Install and start the Chatty App Websocket Server
cd chatty_server
npm install
npm start
```

#### App Instructions
1. Hit enter in the username textbox to submit a username update. 
2. Hit enter in the message textbox to submit a new message with specified username. 
3. Paste an URL to an image file to send an image to the chat(.gif, .jpg, .jpeg, .tiff, .png) 

### Dependencies

#### Client
* babel-core 6.23.1
* babel-loader 6.3.1
* babel-preset-es2015 6.22.0
* babel-preset-react 6.23.0
* babel-preset-stage-0 6.22.0
* css-loader 0.26.1
* node-sass 4.5.0
* react 15.4.2
* react-dom 15.4.2
* sass-loader 6.0.0
* sockjs-client 1.1.2 or above
* style-loader 0.13.1
* webpack 2.2.1
* webpack-dev-server 2.3.0

#### Server
* express 4.16.4
* ws 7.0.0
* uuid 3.3.2 or above

### Upcoming features

1. User login
2. Improved handling of broken image URL
3. Improved handling of very long username or messages
4. Emoji support
5. Gif keyboard support