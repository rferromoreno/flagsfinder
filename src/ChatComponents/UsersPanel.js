import React, { Component } from 'react';
import User from './UserItem';
import UsernameModal from './UsernameModal';
import { Grid, Segment, Header } from 'semantic-ui-react';

class UsersPanel extends Component {
  render() {
    let { users } = this.props;
    return (
      <Grid.Column>
        <Segment>
          <Header as='h2'>Users</Header>
          {
            Object.keys(users).map((key, index) => (
              <User
                key={index}
                username={users[key]}
              />)
            )
          }
        </Segment>
        <Segment>
          <UsernameModal />
        </Segment>
      </Grid.Column>
    )
  }
}

export default UsersPanel;