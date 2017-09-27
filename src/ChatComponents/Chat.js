import React, { Component } from 'react';
import InputField from './InputField';
import Message from './Message';
import User from './User';
import { socketConnect } from 'socket.io-react';
import { Grid, Segment, Header, Comment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      rooms: [],
      users: {},
      messages: [] 
    };
    this.props.socket.on('chat:message', (payload) => {
      console.log(payload);
      let { messages } = this.state;
      messages.push(payload);
      this.setState({messages}); 
    })
    this.props.socket.on('user:list', (payload) => {
      console.log(payload);
      this.setState({users: payload});
    });
  }

  render() {
    return (
      <div>
        <Grid columns='equal'>
          <Grid.Column>
            <Segment>
              <Header as='h2'>Rooms</Header>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8} textAlign='left'>
            <Segment>
                <Comment.Group minimal>
                  <Header as='h2' dividing>Chat</Header>
                  {
                    this.state.messages.map((msg, index) => (<Message key={index} username={msg.username} message={msg.message} date={msg.date} />))
                  }
                </Comment.Group>
                <InputField />
              </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as='h2'>Users</Header>
              {
                Object.keys(this.state.users).map((user, index) => (<User key={index} username={this.state.users[user]}/>))
              }
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default socketConnect(Chat);