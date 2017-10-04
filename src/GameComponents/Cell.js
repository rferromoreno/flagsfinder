import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';

class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dirty: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		// board tilted by multiclicking, please stahp
		if (this.props.boardTilted) return;
		// game ended, no moves permitted
		if (this.props.ended) return;
		// not your turn, sorry.
		if (this.props.turn !== this.props.socket.id) return;
		// nothing to do, button already clicked.
		if (this.state.dirty) return;

		this.props.setBoardTilted(true, () => {
			this.setState({ dirty: true }, () => {
				let { row, column, room } = this.props;
				this.props.socket.emit('message', { row, column, room });
				setTimeout(this.props.setBoardTilted(false, () => {}) , 2000)
			});
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({ dirty: true });
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		// Only re-render when the value changed. Not when turn changes
		return nextProps.value !== this.props.value;
	}

	render() {
		let classColor;
		switch (this.props.value) {
			case 0:
				classColor = '#AAAAAA';
				break;
			case 1:
				classColor = '#2061c9';
				break;
			case 2:
				classColor = '#0d9335';
				break;
			case 3:
				classColor = '#d11212';
				break;
			case 4:
				classColor = '#7594a8';
				break;
			case 5:
				classColor = '#9b9b0a';
				break;
			case 6:
				classColor = '#c47f11';
				break;
			case 7:
				classColor = '#a00893';
				break;
			case 8:
				classColor = '#34c1b1';
				break;
			default:
				classColor = '#000000';
		}

		return (
			<button className="square" style={{ color: classColor }} onClick={this.handleClick}>
				{this.props.value}
			</button>
		);
	}
}

export default socketConnect(Cell);
