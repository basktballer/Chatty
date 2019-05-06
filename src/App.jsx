import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import messages from  "./messages.json"


class App extends Component {

  constructor(props) {
    super();
    this.state = {
      messages
    }
  }

  render() {
    return (
      <div>        
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages= {this.state.messages}/>
        <ChatBar/>
      </div>
    );
  }
}
export default App;
