import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';

const RoomsPanel = (props) => (
  <Grid.Column>
    <Segment>
      <Header as='h2'>Rooms</Header>
    </Segment>
  </Grid.Column>
);

export default RoomsPanel;