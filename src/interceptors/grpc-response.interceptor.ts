import { HttpStatusMessage } from 'src/interfaces/enums';
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GRpcResponse } from 'src/interfaces/global.interface';

@Injectable()
export class GRpcTransformInterceptor<T>
    implements NestInterceptor<T, GRpcResponse>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<GRpcResponse> {
        return next.handle().pipe(
            map((data) => {
                return {
                    status: data.status || HttpStatus.OK,
                    message: data.message || HttpStatusMessage.OK,
                    timestamp: data.timestamp || new Date().toISOString(),
                    data: data.data ? JSON.stringify(data.data) : '',
                    error: data.error ? JSON.stringify(data.error) : '',
                };
            }),
        );
    }
}
