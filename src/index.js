import { PrismaClient } from '@prisma/client';
import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from 'discord-akairo';
import config from './config';
import * as path from 'path';

export class MyClient extends AkairoClient {
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

    this.db = new PrismaClient();
  }
}

const client = new MyClient();
client.login(config.token);
