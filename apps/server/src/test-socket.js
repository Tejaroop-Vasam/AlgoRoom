const { io } = require('socket.io-client');

const URL = 'http://localhost:6767/rooms';
const ROOM_CODE = 'RY8QRC';

const user1 = io(URL, { auth: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzMzAyZTI1LTMwOWQtNGNkMi1hMDIxLTUyMTc1MTE3YjQ5MCIsImVtYWlsIjoidXNlcjFAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE3OTUzMzUyOTgsImV4cCI6MTc5NTQyMTY5OH0.neA7VKm-kyvSfA4hRMeAMwJjce2zFX3RnxdiH_LgV3o' } });
const user2 = io(URL, { auth: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFmNGJhMDRhLTBhYWEtNDFhMi05OTMyLWI0ZGYyMjA0OTMyNSIsImVtYWlsIjoidXNlcjJAZ21haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE3OTUzMzUzMzksImV4cCI6MTc5NTQyMTczOX0.4nqYUkSKRIUMMMrEzwgwXUZfCRxNizBlyv-ZemfLvew' } });

user1.onAny((event, ...args) => console.log(`[User 1 <- ${event}]`, JSON.stringify(args)));
user2.onAny((event, ...args) => console.log(`[User 2 <- ${event}]`, JSON.stringify(args)));

user1.on('connect', () => {
  console.log('User 1 connected:', user1.id);
  user1.emit('joinLobby', { code: ROOM_CODE });

  setTimeout(() => {
    console.log('User 1 sending message...');
    user1.emit('chatMessage', {
      roomCode: ROOM_CODE,
      message: 'Hey everyone, ready to start?',
    });
  }, 1000);
});

user2.on('connect', () => {
  console.log('User 2 connected:', user2.id);
  user2.emit('joinLobby', { code: ROOM_CODE });
});

user2.on('roomStateUpdated', (room) => {
  console.log('🔄 Room state updated. Participants:', room.participants.length);
});

user2.on('chatBroadcast', (data) => {
  console.log(`💬 [${data.timestamp}] ${data.user.username}: ${data.message}`);
});

user1.on('error', (err) => console.error('User 1 Error:', err));
user2.on('error', (err) => console.error('User 2 Error:', err));