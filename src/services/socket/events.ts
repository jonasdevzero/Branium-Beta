import socket from './';
import store from '../../store';

const dispatch = store.dispatch;

export function attachEvents() {
  socket.on('update', (action) => dispatch(action));
}
