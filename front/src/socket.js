import { io } from 'socket.io-client';

const socket = io('http://172.16.44.88:3000', {
  autoConnect: false,  // Prevent auto connection
});

export default socket;
