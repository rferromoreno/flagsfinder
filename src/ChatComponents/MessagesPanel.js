import React, { Component } from 'react';
import InputField from './InputField';
import Message from './MessageItem';
import { Grid, Comment, Segment, Header } from 'semantic-ui-react';
import { socketConnect } from 'socket.io-react'

class MessagesPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: []
		};
		this.props.socket.on('chat:message', payload => {
			let { messages } = this.state;
			messages.push(payload);
			this.setState({ messages });
		});
	}
	render() {
		let { messages } = this.state;
		return (
			<Grid.Column width={this.props.width} textAlign='left' stretched>
				<Segment>
					<Comment.Group minimal>
						<Header as="h2" dividing>
							Chat
						</Header>
						{messages.map((msg, index) => (
							<Message key={index} username={msg.username} message={msg.message} date={msg.date} />
						))}
					</Comment.Group>
					<InputField />
				</Segment>
			</Grid.Column>
		);
	}
}

export default socketConnect(MessagesPanel);
