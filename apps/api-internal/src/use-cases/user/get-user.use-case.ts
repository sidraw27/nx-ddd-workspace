import { BaseUseCase } from '@application/base.use-case';
import { UserRepository } from '@infrastructure/repositories';
import { Injectable } from '@nestjs/common';

export class UserBasicInfoOutput {
  id: bigint;
  email: string;
}

@Injectable()
export class GetUserUseCase implements BaseUseCase<bigint, UserBasicInfoOutput> {
  public constructor(
    private readonly repository: UserRepository,
  ) {}

  public async execute(input: bigint): Promise<UserBasicInfoOutput> {
    const user = await this.repository.find(input);

    return user.getBasicInfo();
  }
}
