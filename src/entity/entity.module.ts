import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/providers/database/db.module';
import { schemaProviders } from 'src/providers/schemas/schema.provider';
import { UserEntity } from './user.entity';

@Module({
    imports: [DatabaseModule],
    providers: [...schemaProviders, UserEntity],
    exports: [UserEntity],
})
export class EntityModule {}
