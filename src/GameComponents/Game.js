import React, { Component } from 'react';
import Board from './Board';
import { Grid } from 'semantic-ui-react';

class Game extends Component {

  render() {
    return (
      <Grid>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={8}>
          <Board room={this.props.room} />
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Game;
