import { CreateUserInput, CreateUserUseCase } from '@application/user/create-user.use-case';
import { GetUserUseCase } from '@application/user/get-user.use-case';
import { ParseBigintPipe } from '@infrastructure/transformers/parse-bigin.pipe';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller()
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {}

  @ApiBody({
    type: CreateUserInput
  })
  @ApiResponse({
    status: 201
  })
  @Post()
  public createUser(@Body() createUserInput: CreateUserInput) {
    return this.createUserUseCase.execute(createUserInput);
  }

  @ApiParam({
    name: 'id',
    type: String
  })
  @ApiResponse({
    status: 200
  })
  @Get(':id')
  public getUser(@Param('id', ParseBigintPipe) id: bigint) {
    return this.getUserUseCase.execute(id);
  }
}
