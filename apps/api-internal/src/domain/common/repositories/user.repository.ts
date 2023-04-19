import { UserEntity } from '@domain/common/entities';

export interface IUserRepository {
  create(payload: { name: string, email: string, phone: { countryCode: string, number: string } }): Promise<UserEntity>
  find(id: bigint): Promise<UserEntity>
}
