import React, {Component} from 'react';

class Message extends Component {
  render() {

    if (this.props.message.username) {
      return (
        <div className="message">
          <span className="message-username" style={{color: this.props.message.color}}>{this.props.message.username}</span>
          <span className="message-content">

            {(/\.(gif|jp?g|tiff|png)$/i).test(this.props.message.content) ?
              (<img src={this.props.message.content}/>) 
              :
              (this.props.message.content)          
            }

          </span>
        </div>
      ) 
    } else {
      return(
        <div className="message system">
          {this.props.message.content}
        </div>
      )
    }
  }
}
export default Message;
