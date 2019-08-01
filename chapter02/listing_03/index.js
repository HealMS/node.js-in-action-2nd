const net = require('net');
const events = require('events');
const channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};
channel.on('join', function (id, client) {
    const Welcome = `
        Welcome!  Guest online: ${this.listeners('broadcast').length}
    `;
    client.write(`${Welcome}\n`);
    this.clients[id] = client;
    this.subscriptions[id] = (senderId, message) => {
        if (senderId !== id) {
            this.clients[id].write(message);
        }
    }
    this.on('broadcast', this.subscriptions[id]);
});
channel.on('leave', function (id) {
    this.removeListener('broadcast', this.subscriptions[id]);
    this.emit('broadcast', id, `${id} has left the chatroom.\n`);
});

const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    channel.emit('join', id, client);
    let chunk = '';
    client.on('data', data => {
        chunk += data.toString();  //buffer -> string 
        if (chunk.endsWith('\n')) {
            channel.emit('broadcast', id, chunk);
            chunk = '';
        }
    });
    client.on('close', () => {
        channel.emit('leave', id);
    });
});
server.listen(8888);