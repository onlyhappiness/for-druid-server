import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: /\/ws-.+/ })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('chat');

  constructor() {
    this.logger.log('📦 constructor');
  }

  // connection 되자마자 실행
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`✅ connected: ${socket.id} ${socket.nsp.name}`);
  }

  //
  afterInit() {
    this.logger.log('✅ 웹소켓 서버 초기화');
  }

  // socket 연결이 끊겼을 떄
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`🚫 disconnected: ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    console.log('message: ', data);
  }
}
