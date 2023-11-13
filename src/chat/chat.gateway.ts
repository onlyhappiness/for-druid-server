import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: /\/ws-.+/ })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor() {
    this.logger.log('constructor');
  }

  afterInit() {
    this.logger.log('init');
  }

  // connection 되자마자 실행
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected: ${socket.id} ${socket.nsp.name}`);
  }

  // socket 연결이 끊겼을 떄
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected: ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    console.log('message: ', data);
  }
}
