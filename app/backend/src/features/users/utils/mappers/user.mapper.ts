import { UserDto } from '../../dtos/user.dto';
import { UserEntity } from '../../../../core/entities/user.entity';

export function mapUserEntityToDto(entity: UserEntity): UserDto | null {
    if (!entity) {
        return null;
    }

    return {
        id: entity.id || '',
        username: entity.username,
        fullname: entity.fullname,
        roles: entity.roles
    };
}

export function mapUserEntitiesToDtos(entities: UserEntity[]): UserDto[] {
    return (entities?.map(mapUserEntityToDto) ?? []) as UserDto[];
}
