import React, { Component } from 'react';
import { Grid, Segment, Header, Button, List } from 'semantic-ui-react';
import { socketConnect } from 'socket.io-react';

class RoomsPanel extends Component {

  constructor(props) {
    super(props);
    this.handleButton=this.handleButton.bind(this);
    this.handleJoinRoom=this.handleJoinRoom.bind(this);
  }

  handleButton(e) {
    e.preventDefault()
    this.props.setGame();
  }

  handleJoinRoom(room) {
    this.props.socket.emit('game:join', room);
  }

  render() {
    let { rooms } = this.props;
    return (
      <Grid.Column>
        <Segment>
          <Header as='h2'>Rooms</Header>
          <List selection verticalAlign='middle'>
            {
              rooms.map((room, index) => (
                <List.Item key={index} onClick={() => this.handleJoinRoom(room)}>
                  <List.Content>
                    <List.Header>
                      {room}
                    </List.Header>
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
        </Segment>
        <Segment>
          <Button fluid color='blue' onClick={this.handleButton}>Create room</Button>
        </Segment>
      </Grid.Column>
    );
  }
}
export default socketConnect(RoomsPanel);