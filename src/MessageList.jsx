import React, {Component} from 'react';
import Message from './Message.jsx';
import { generateRandomId } from "./utils";


class MessageList extends Component {
  render() {
    let messages = this.props.messages;
    // if (this.state.loading) {
    //   taskItems = (
    //     <tr>
    //       <td>Loading Items</td>
    //     </tr>
    //   );
    // } else {
    let messagelist = messages.map(message => (
        <Message key={generateRandomId()} message={message} />
      ));
    // }
    console.log(messagelist);

    return (
      <main className="messages">      
        <div className="messages">
          {messagelist}
        </div>
      </main>
    );
  }

}
export default MessageList;
