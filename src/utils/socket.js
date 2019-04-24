import io from 'socket.io-client';
// import config from '../config/client';

// const socket = io.connect(config.server);
const socket = io.connect('http://127.0.0.1:8000');

export default socket;
