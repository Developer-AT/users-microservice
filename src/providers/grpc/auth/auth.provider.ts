import { Observable } from 'rxjs';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthProvider implements OnModuleInit {
  private authService;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.authService = this.client.getService('AuthService');
  }

  validate(payload): Observable<object> {
    return this.authService.Validate(payload);
  }
}
