import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WSAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ws = context.switchToWs().getClient();
    return ws.handshake;
  }
}
