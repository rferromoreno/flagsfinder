import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
const socket = io.connect();
socket.on('message', msg => console.log(msg));

ReactDOM.render(
	<SocketProvider socket={socket}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</SocketProvider>,
	document.getElementById('root')
);

registerServiceWorker();
