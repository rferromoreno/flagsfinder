import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

const Scores = (props) => (
  <Grid.Row>
    <Segment>
      Player one: {props.playerOneScore}
    </Segment>
    <Segment>
      Player two: {props.playerTwoScore}
    </Segment>
    <Segment>
      Flags left: {props.flagsLeft}
    </Segment>
  </Grid.Row>
);

export default Scores;