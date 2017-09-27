import React, { Component } from 'react';
import InputField from './InputField';
import Message from './Message'

class Chat extends Component {

  constructor(props) {
    super(props);
    this.setState({ messages: [] });
  }

  render() {
    return (
      <div>
        <h1>Chat</h1>
        {
          this.state.messages.map((msg) => (<Message message={msg} />))
        }
        <InputField/>
      </div>
    )
  }
}

export default Chat;