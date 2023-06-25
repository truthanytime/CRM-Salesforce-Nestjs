import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WSAuthGuard } from '@/auth/guards/WSAuthGuard';
import { IAuthedUser } from '@/auth/types';
import { TenantUpdateEventDto } from '../dto/tenant-update-event.dto';

enum WS_SERVER_EVENTS {
  JOIN_TENANT_GROUP = 'join-tenant-updates-group',
  TENANT_UPDATE_EVENT = 'tenant-update',
}
enum WS_CLIENT_EVENTS {
  GROUP_JOINED = 'group-joined',
}
const TENANT_UPDATE_EVENT_PREFIX = 'tenant-updates';

@WebSocketGateway({ cors: true })
export class UpdateGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleDisconnect(client: Socket) {
    console.log('Web socket client disconnected:', client.id);
  }

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log('connection received', client.handshake.headers);
    console.log('total connection', this.server.sockets.sockets.size);
  }

  @UseGuards(WSAuthGuard)
  @SubscribeMessage(WS_SERVER_EVENTS.JOIN_TENANT_GROUP)
  async handleJoinTenantUpdatesGroup(client: Socket) {
    const handshake: any = client.handshake;
    const user: IAuthedUser = handshake.user;
    console.log(
      `${WS_SERVER_EVENTS.JOIN_TENANT_GROUP} received:::`,
      `User: ${user.userId}, Tenant: ${user.tenantId}`,
    );
    const groupName = `${TENANT_UPDATE_EVENT_PREFIX}-${user.tenantId}`;
    client.join(groupName);
    client.emit(WS_CLIENT_EVENTS.GROUP_JOINED, { groupName });
    return 'ok';
  }

  // @UseGuards(WSAuthGuard)
  @SubscribeMessage(WS_SERVER_EVENTS.TENANT_UPDATE_EVENT)
  async handleTenantScoreTableUpdate(client: Socket, incomingPayload: string) {
    console.log(
      `${WS_SERVER_EVENTS.TENANT_UPDATE_EVENT} received:::`,
      incomingPayload,
    );
    const payload: TenantUpdateEventDto =
      typeof incomingPayload === 'string'
        ? JSON.parse(incomingPayload)
        : incomingPayload;
    const groupName = `${TENANT_UPDATE_EVENT_PREFIX}-${payload.tenantId}`;
    this.server
      .to(groupName)
      .emit(WS_SERVER_EVENTS.TENANT_UPDATE_EVENT, payload);
    return 'ok';
  }
}
