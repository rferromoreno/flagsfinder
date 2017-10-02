import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import { Grid } from 'semantic-ui-react';
import RoomsPanel from './RoomsPanel';
import UsersPanel from './UsersPanel';
import MessagesPanel from './MessagesPanel';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      rooms: [],
      users: {}
    };
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
      <div>
        <Grid columns='equal'>
          <RoomsPanel rooms={this.state.rooms} setGame={this.props.setGame}/>
          <MessagesPanel width={8}/>
          <UsersPanel users={this.state.users}/>      
        </Grid>
      </div>
    )
  }
}

export default socketConnect(Chat);