import React, {Component} from 'react';

class ChatBar extends Component {

  onKeyPressMessage = (e) => {
    let message = e.target.value;
    if(e.which === 13) {
      this.props.sendNewMessage(message);
      e.target.value = '';
    }
  }

  onKeyPressUsername = (e) => {
    let username = e.target.value;
    if(e.which === 13) {
      this.props.changeUsernameValue(username);
    }
  }
  
  render() {
    return (
      <footer className='chatbar'>
        <input className='chatbar-username' name='username' defaultValue={this.props.currentUserName} onKeyPress={this.onKeyPressUsername} />
        <input className='chatbar-message' name='content' placeholder='Type a message and hit ENTER' onKeyPress={this.onKeyPressMessage}/>
    </footer>
    );
  }
}
export default ChatBar;
