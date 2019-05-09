import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

export default class App extends Component {

  constructor(props) {
    super();
    this.state = {
      messages: [],
      currentUserName: "Anonymous", 
      currentUserColor: "",
      activeConnections: 0
    }
  }
  
  componentDidMount = () => {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };
    this.socket.onmessage = (event) => {
      // code to handle incoming message
      let data = JSON.parse(event.data)
      
      const newMessageItem = {}
      let oldMessages;
      let newMessages;

      switch(data.type) {

        case "incomingMessage" :
          newMessageItem.username = data.username;
          newMessageItem.content = data.content;
          newMessageItem.id = data.id;
          newMessageItem.color = data.color;
          oldMessages = this.state.messages;
          newMessages = [...oldMessages, newMessageItem];
          this.setState({messages: newMessages});   
          break;
        case "incomingNotification" :
          newMessageItem.content = data.content;
          newMessageItem.id = data.id;
          oldMessages = this.state.messages;
          newMessages = [...oldMessages, newMessageItem];
          this.setState({messages: newMessages});    
          break;
        case "incomingConnCount" :
          this.setState({activeConnections: data.activeConns})
          break;
        default:
          throw new Error("Unknown event type " + data.type)
      }

    }
  } 

  sendNewMessage = (message) => {
    const newMessageItem = {
      type: "postMessage",
      username: this.state.currentUserName,
      content: message
    }

    this.socket.send(JSON.stringify(newMessageItem)); 
    
  }

  addNewMessage = (message) => {
    const newMessageItem = {
      username: this.state.currentUserName,
      content: message
    }

    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessageItem];
    this.setState({messages: newMessages});
  }

  changeUsernameValue = (name) => {
    const newNotificationItem = {
      type: "postNotification",      
      content: `${this.state.currentUserName} has changed their name to ${name}`
    }
    this.setState({currentUserName: name })
    this.socket.send(JSON.stringify(newNotificationItem)); 
  }

  render() {
   return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-connCount">{this.state.activeConnections} users online</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUserName={this.state.currentUserName} sendNewMessage={this.sendNewMessage} 
          changeUsernameValue={this.changeUsernameValue}/>
      </div>
        );
  }
}
