// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1')
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let activeConns = 0;
// Array with some colors
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
// ... in random order
colors.sort(function(a,b) { return Math.random() > 0.5; } );

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  activeConns++;
  let connCount = {
    activeConns,
    type: 'incomingConnCount'
  };
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(connCount));
    }
  });
  let userColor = colors.shift();

  ws.on('message', function incoming(message) {
    let parseMsg = JSON.parse(message);
    let broadcast = parseMsg;
    broadcast.id = uuidv1();
    
    switch(parseMsg.type) {
      case 'postMessage' :
        broadcast.type = 'incomingMessage';
        broadcast.color = userColor;
        break;
      case 'postNotification' :
        broadcast.type = 'incomingNotification';
        break;
      default:
        throw new Error('Unknown event type ' + parseMsg.type);      
    };
    
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(broadcast));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    activeConns--;
    let connCount = {
      activeConns,
      type: 'incomingConnCount'
    };
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(connCount));
      }
    });
  });

});