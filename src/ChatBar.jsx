import React, {Component} from 'react';

function ChatBar({currentUserName, sendNewMessage, changeUsernameValue}) {

  const onKeyPressMessage = (e) => {
    let message = e.target.value;
    if(e.which === 13) {
      sendNewMessage(message);
      e.target.value = '';
    }
  }

  const onKeyPressUsername = (e) => {
    let username = e.target.value;
    if(e.which === 13) {
      changeUsernameValue(username);
    }
  }
  
  return (
    <footer className='chatbar'>
      <input className='chatbar-username' name='username' defaultValue={currentUserName} onKeyPress={onKeyPressUsername} />
      <input className='chatbar-message' name='content' placeholder='Type a message and hit ENTER' onKeyPress={onKeyPressMessage}/>
  </footer>
  );
}
export default ChatBar;
