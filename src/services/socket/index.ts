import io from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_API_URL || '';

export default io(URL, {
  autoConnect: false,
  transports: ['websocket'],
});

export * from './events';
