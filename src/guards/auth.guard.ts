import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {
  private authService;

  constructor(
    private reflector: Reflector,
    @Inject('AUTH_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService('AuthService');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    this.validate(request.headers.authorization, roles).subscribe((data) => {
      console.log(data);
    });
    return true;
  }

  validate(token, roles): Observable<object> {
    return this.authService.Validate({
      token: token,
      roles: roles,
    });
  }
}
