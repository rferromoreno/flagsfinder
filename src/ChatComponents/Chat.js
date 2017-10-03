import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import { Grid } from 'semantic-ui-react';
import RoomsPanel from './RoomsPanel';
import UsersPanel from './UsersPanel';
import MessagesPanel from './MessagesPanel';
import { withRouter } from 'react-router-dom';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			users: {}
		};
		this.props.socket.on('information', payload => {
			console.log(payload);
			this.setState({
				users: payload.usernames,
				rooms: payload.rooms
			});
		});
    this.props.socket.on('game:created:ok', this.redirectToRoom);
  }
  
  redirectToRoom = payload => {
    this.props.history.push('/room/' + payload.room);
  };

	componentWillMount() {
    this.props.socket.emit('join', 'global');
	}

	componentWillUnmount() {
    this.props.socket.emit('leave', 'global');
	}

	render() {
		return (
			<div>
				<Grid columns="equal">
					<RoomsPanel rooms={this.state.rooms} />
					<MessagesPanel width={8} room='global' />
					<UsersPanel users={this.state.users} />
				</Grid>
			</div>
		);
	}
}

export default withRouter(socketConnect(Chat));
