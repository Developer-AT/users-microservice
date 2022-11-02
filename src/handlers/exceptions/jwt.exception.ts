import { HttpException, HttpStatus } from '@nestjs/common';
import { AcceptAny } from 'src/interfaces/types';

export class JwtException extends HttpException {
    constructor(error: Record<string, AcceptAny>) {
        super(error.message, HttpStatus.UNAUTHORIZED);
    }
}
