import React from 'react';
import InputField from './InputField';
import Message from './MessageItem';
import { Grid, Comment, Segment, Header } from 'semantic-ui-react';

const MessagesPanel = (props) => (
  <Grid.Column width={8} textAlign='left' stretched>
    <Segment>
      <Comment.Group minimal>
        <Header as='h2' dividing>Chat</Header>
        {
          props.messages.map((msg, index) => (
            <Message
              key={index}
              username={msg.username}
              message={msg.message}
              date={msg.date}
            />)
          )
        }
      </Comment.Group>
      <InputField />
    </Segment>
  </Grid.Column>
);

export default MessagesPanel;