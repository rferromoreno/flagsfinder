import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import RoomsPanel from './RoomsPanel';
import UsersPanel from './UsersPanel';
import MessagesPanel from './MessagesPanel';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      rooms: [],
      users: {},
      messages: [] 
    };
    this.props.socket.on('chat:message', (payload) => {
      let { messages } = this.state;
      messages.push(payload);
      this.setState({messages}); 
    })
    this.props.socket.on('information', (payload) => {
      console.log(payload);
      this.setState({
        users: payload.usernames,
        rooms: payload.rooms        
      });
    });
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Grid columns='equal' style={{height: '100%'}}>
          <RoomsPanel rooms={this.state.rooms} setGame={this.props.setGame}/>
          <MessagesPanel messages={this.state.messages}/>
          <UsersPanel users={this.state.users}/>      
        </Grid>
      </div>
    )
  }
}

export default socketConnect(Chat);