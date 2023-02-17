import { SetMetadata } from '@nestjs/common';

export const AccessBy = (accessBy: string) => SetMetadata('accessBy', accessBy);

export const HavingRole = (...roles: string[]) => SetMetadata('roles', roles);
