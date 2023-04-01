import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ProductProvider implements OnModuleInit {
    private productService;

    constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}
    onModuleInit() {
        this.productService = this.client.getService('ProductService');
    }
}
