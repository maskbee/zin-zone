const https = require('https');
const crypto = require('crypto');

// Check if ws package is installed or test basic websocket
try {
  const WebSocket = require('ws');
  console.log('ws is available!');
} catch (e) {
  console.log('ws not installed, checking if we can install or use built-in');
}
