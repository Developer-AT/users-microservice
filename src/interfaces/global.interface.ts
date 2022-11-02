import { AcceptAny } from './types';

interface Response {
    status: number;
    message: string;
    timestamp: string;
}

export interface Empty {}

export interface GRpcResponse extends Response {
    data: string;
    error: string;
}

export interface HttpResponse extends Response {
    data: Record<string, AcceptAny>;
    error: Record<string, AcceptAny>;
}
