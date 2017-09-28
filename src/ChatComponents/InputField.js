import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import { Input, Button } from 'semantic-ui-react';

const ENTER_KEY_CODE = 13;

class InputField extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange=this.handleChange.bind(this);
    this.handleButton=this.handleButton.bind(this);
    this.handleKeyDown=this.handleKeyDown.bind(this);
  }
  
  handleChange(e) {
    let msg = e.target.value;
    if (msg.length < 200) {
      this.setState({value: msg});
    }
  }

  handleButton(e) {
    e.preventDefault();
    let { value } = this.state;
    let msg = value.trim();
    if (msg.length > 3) {
      this.props.socket.emit('chat:message', msg);
      this.setState({value:''});
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.handleButton(e);
    }
  }

  render() {
    return (
      <div>
        <Input 
          fluid
          action={<Button floated='right' onClick={this.handleButton}>Send</Button>}
          placeholder='Write a message...' 
          type="text" 
          value={this.state.value} 
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          />
      </div>
    );
  }
}

export default socketConnect(InputField);