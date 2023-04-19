import { BaseUseCase } from '@application/base.use-case';
import { UserBasicInfoOutput } from '@application/user/get-user.use-case';
import { UserRepository } from '@infrastructure/repositories';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsObject, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';

class UserPhoneInput {
  @ApiProperty()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsPhoneNumber('TW')
  number: string;
}

export class CreateUserInput {
  @ApiProperty()
  @IsEmail({}, { message: 'Illegal email format.' })
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => UserPhoneInput)
  phone: UserPhoneInput;
}

@Injectable()
export class CreateUserUseCase implements BaseUseCase<CreateUserInput, UserBasicInfoOutput> {
  public constructor(
    private readonly repository: UserRepository,
  ) {}

  public async execute(input: CreateUserInput): Promise<UserBasicInfoOutput> {
    const { name, email, phone } = input;

    const user = await this.repository.create({
      name,
      email,
      phone
    });

    return user.getBasicInfo();
  }
}
