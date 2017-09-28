import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';

class MessageItem extends Component {
  render() {
    let date = new Date(this.props.date).toTimeString();
    return  (
      <Comment>
        <Comment.Content>
          <Comment.Author as='a'>{this.props.username}</Comment.Author>
          <Comment.Metadata>
            <div>{date}</div>
          </Comment.Metadata>
          <Comment.Text>{this.props.message}</Comment.Text>
        </Comment.Content>
      </Comment>
      )
  }
}

export default MessageItem;