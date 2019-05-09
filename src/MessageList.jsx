import React, {Component} from 'react';
import Message from './Message.jsx';

function MessageList( {messages}) {
      let messagelist = messages.map(message => 
        <Message key={message.id} message={message} />
      );
      
    return (
      <main className='messages'>      
        <div className='messages'>
          {messagelist}
        </div>
      </main>
    );
}
export default MessageList;
