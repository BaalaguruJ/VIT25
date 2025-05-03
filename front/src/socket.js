import { io } from 'socket.io-client';

const socket = io('https://cropcare-r7hr.onrender.com', {
  autoConnect: false,  // Prevent auto connection
});

export default socket;
