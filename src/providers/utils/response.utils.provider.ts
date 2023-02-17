import { HttpStatusMessage } from 'src/interfaces/enums';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { AcceptAny } from 'src/interfaces/types';
import { GRpcResponse, HttpResponse } from 'src/interfaces/global.interface';

@Injectable()
export class ResponseUtilsProvider {
    gRpcRsponseHandler(res: GRpcResponse): HttpResponse {
        const response: HttpResponse = {
            status: res.status,
            message: res.message,
            timestamp: res.timestamp,
            data: JSON.parse(res.data),
            error: JSON.parse(res.error),
        };

        if (response.status > 299) {
            throw new HttpException(response, response.status);
        }

        return response;
    }
}
