import React, { Component } from 'react'
import { Button, Modal, Input } from 'semantic-ui-react'
import { socketConnect } from 'socket.io-react';

const ENTER_KEY_CODE = 13;

class UsernameModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      open: false
    };
    this.handleButton=this.handleButton.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.showModal=this.showModal.bind(this);
    this.closeModal=this.closeModal.bind(this);
    this.handleKeyDown=this.handleKeyDown.bind(this);
  }

  showModal() {
    this.setState({open: true})
  }

  closeModal() {
    this.setState({value: '', open: false})
  }

  handleChange(e) {
    let msg = e.target.value;
    if (msg.length < 32) {
      this.setState({value: msg});
    }
  }
  
  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.handleButton(e);
    }
  }

  handleButton(e) {
    e.preventDefault();
    let { value } = this.state;
    let username = value.trim();
    if (username.length > 3) {
      this.props.socket.emit('user:changeName', username);
      this.setState({value:'', open: false});
    }
  }

  render() {
    let { open, value } = this.state;
    return (
      <div>
        <Button fluid onClick={this.showModal} color='green'>Change username</Button>
        <Modal open={open}>
          <Modal.Header>
            Change your username
          </Modal.Header>
          <Modal.Content>
            <p>Please, select a nickname (4 characters min.): </p>
            <Input
              fluid
              placeholder='Enter an username'
              type="text"
              value={value}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              positive
              labelPosition='right'
              icon='checkmark'
              content='Done'
              onClick={this.handleButton}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default socketConnect(UsernameModal);