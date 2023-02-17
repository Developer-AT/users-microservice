import { Connection } from 'mongoose';
import { UserSchema, UserModelName } from './user.schema';

export const schemaProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) =>
            connection.model(UserModelName, UserSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
