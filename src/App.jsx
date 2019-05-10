import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

export default class App extends Component {

  constructor(props) {
    super();
    this.state = {
      messages: [],
      currentUserName: 'Anonymous', 
      activeConnections: 0
    };
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
    
  componentDidUpdate() {
    this.scrollToBottom();
  }
  
  componentDidMount = () => {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    };
    this.scrollToBottom();
    this.socket.onmessage = (event) => {
      // code to handle incoming message
      let data = JSON.parse(event.data);
      
      const newMessageItem = {}
      let oldMessages;
      let newMessages;

      switch(data.type) {

        case 'incomingMessage' :
          newMessageItem.username = data.username;
          newMessageItem.content = data.content;
          newMessageItem.id = data.id;
          newMessageItem.color = data.color;
          oldMessages = this.state.messages;
          newMessages = [...oldMessages, newMessageItem];
          this.setState({messages: newMessages});   
          break;
        case 'incomingNotification' :
          newMessageItem.content = data.content;
          newMessageItem.id = data.id;
          oldMessages = this.state.messages;
          newMessages = [...oldMessages, newMessageItem];
          this.setState({messages: newMessages});    
          break;
        case 'incomingConnCount' :
          this.setState({activeConnections: data.activeConns});
          break;
        default:
          throw new Error('Unknown event type ' + data.type);
      }

    }
  } 

  sendNewMessage = (message) => {

    let sliceMsg = message.slice(0, 140);
    const newMessageItem = {
      type: 'postMessage',
      username: this.state.currentUserName,
      content: sliceMsg
    };

    this.socket.send(JSON.stringify(newMessageItem)); 
    
  }

  changeUsernameValue = (name) => {
    let sliceName = name.trim().slice(0, 40);
    const newNotificationItem = {
      type: 'postNotification'
    }    
    if (sliceName === '') {
      sliceName = 'Anonymous';
      newNotificationItem.content= `${this.state.currentUserName} has changed their name to ${sliceName}`
    } else if (sliceName === this.state.currentUserName) {      
      newNotificationItem.content = `User name ${this.state.currentUserName} is unchanged`
      
    } else {
      newNotificationItem.content= `${this.state.currentUserName} has changed their name to ${sliceName}`
    }
    this.setState({currentUserName: sliceName });
    this.socket.send(JSON.stringify(newNotificationItem)); 
  }

  render() {
   return (
     <div>
      <ChattyPresenter
        activeConnections = {this.state.activeConnections}
        messages = {this.state.messages}
        currentUserName = {this.state.currentUserName}
        sendNewMessage = {this.sendNewMessage}
        changeUsernameValue = {this.changeUsernameValue}
        />
      <div style={{ float:"left", clear: "both" }}
        ref={(el) => { this.messagesEnd = el; }}>
      </div>
    </div>

        );
  }
}

const ChattyPresenter = props => {
  return (
    <div>
      <nav className='navbar'>
      <a href='/' className='navbar-brand'>Chatty</a>
      <span className='navbar-connCount'>{props.activeConnections} users online</span>
      </nav>
      <MessageList messages={props.messages}/>
      <ChatBar currentUserName={props.currentUserName} sendNewMessage={props.sendNewMessage} 
        changeUsernameValue={props.changeUsernameValue}/>
    </div>
  );
}
