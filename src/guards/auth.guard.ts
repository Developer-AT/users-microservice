import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthProvider } from 'src/providers/grpc/auth/auth.provider';

@Injectable()
export class AuthGuard implements CanActivate {
  private authService;

  constructor(
    private reflector: Reflector,
    private readonly authprovider: AuthProvider,
  ) {}

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
    return this.authprovider.validate({
      token: token,
      roles: roles,
    });
  }
}
