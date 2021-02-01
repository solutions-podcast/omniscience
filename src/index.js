const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} = require('discord-akairo');
const config = require('./config');
const path = require('path');

class MyClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: config.ownerID,
      },
      {
        disableMentions: 'everyone',
      }
    );

    this.commandHandler = new CommandHandler(this, {
      directory: path.join(__dirname, 'commands'),
      prefix: config.prefix,
    });
    this.commandHandler.loadAll();

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: path.join(__dirname, 'inhibitors'),
    });
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.inhibitorHandler.loadAll();

    this.listenerHandler = new ListenerHandler(this, {
      directory: path.join(__dirname, 'listeners'),
    });
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
  }
}

const client = new MyClient();
client.login(config.token);

module.exports = MyClient;
