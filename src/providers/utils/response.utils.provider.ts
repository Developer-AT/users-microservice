import { HttpStatusMessage } from 'src/interfaces/enums';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { AcceptAny } from 'src/interfaces/types';
import { GRpcResponse, HttpResponse } from 'src/interfaces/global.interface';

@Injectable()
export class ResponseUtilsProvider {
    /**
     * @description Handle data we rceieved from another service
     * @param {GRpcResponse} res Data we receive from service
     * @returns {HttpResponse}
     */
    gRpcResponseHandler(res: GRpcResponse): HttpResponse {
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

    /**
     * @description Construct Success Response Object
     * @param {Record<string, AcceptAny>} data Actual Data to be Provided in Response
     * @param {number} status Status Code for Response
     * @param {string} statusMsg Status Msg for Response
     * @returns {HttpResponse} Response Object
     */
    successResponse(
        data: Record<string, AcceptAny>,
        status: number = HttpStatus.OK,
        statusMsg: string = HttpStatusMessage.OK,
    ): HttpResponse {
        const response: HttpResponse = {
            status: status,
            message: statusMsg,
            timestamp: new Date().toISOString(),
            data: data,
            error: {},
        };
        return response;
    }

    /**
     * @description Construct Error Response Object
     * @param {HttpException} error Error Object
     * @param {number} status Status Code for Response
     * @param {string} statusMsg Status Msg for Response
     * @returns {HttpResponse} Error Response Object
     */
    errorResponse(
        error: HttpException,
        status: HttpStatus = HttpStatus.BAD_REQUEST,
        statusMsg: HttpStatusMessage = HttpStatusMessage.BAD_REQUEST,
    ): HttpResponse {
        const ErrorResponse: HttpResponse = {
            status: error.getStatus() || status,
            message: error.message || statusMsg,
            timestamp: new Date().toISOString(),
            data: {},
            error: <object>error.getResponse() || {},
        };
        return ErrorResponse;
    }
}
