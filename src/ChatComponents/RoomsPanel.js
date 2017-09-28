import React, { Component } from 'react';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';

class RoomsPanel extends Component {

  constructor(props) {
    super(props);
    this.handleButton=this.handleButton.bind(this);
  }

  handleButton(e) {
    e.preventDefault()
    this.props.setGame();
  }

  render() {
    let { rooms } = this.props;
    return (
      <Grid.Column>
        <Segment>
          <Header as='h2'>Rooms</Header>
          {
            rooms.map((room, index) => (<div key={index}>{room}</div>))
          }
        </Segment>
        <Segment>
          <Button fluid color='blue' onClick={this.handleButton}>Create room</Button>
        </Segment>
      </Grid.Column>
    );
  }
}
export default RoomsPanel;