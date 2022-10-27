import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class BookProvider implements OnModuleInit {
    private bookService;

    constructor(@Inject('BOOK_PACKAGE') private client: ClientGrpc) {}
    onModuleInit() {
        this.bookService = this.client.getService('BookService');
    }
}
