import { User } from './user';
import {
  Entity, Enum, Index, ManyToOne, PrimaryKey, Property, Unique,
} from '@mikro-orm/core';

export enum UserOauthPlatform {
  GOOGLE,
}

@Entity()
@Unique({ name: 'user_oauth_platforms_platform_platform_id_unique', properties: ['platform', 'platformId'] })
export class UserOauth {
  @PrimaryKey({ columnType: 'bigint', autoincrement: false, defaultRaw: 'NEXT_ID()' })
  id!: bigint;

  @ManyToOne(() => User)
  user!: User;

  @Enum(() => UserOauthPlatform)
  platform!: UserOauthPlatform;

  @Index({ name: 'user_oauth_platforms_platform_id_index' })
  @Property({ type: 'varchar' })
  platformId!: string;

  @Property({ type: 'varchar', length: 255, nullable: true })
  email!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ nullable: true, hidden: true })
  deletedAt?: Date;
}
