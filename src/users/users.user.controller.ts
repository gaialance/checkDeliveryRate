import {
    Controller,
    Get,
    UseGuards,
    Request,
    UseInterceptors,
    ClassSerializerInterceptor,
    forwardRef,
    Inject,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { AuthGuard } from '../auth/guards/jwt-auth.guard';
  import { UserType } from './enums/user-type.enum';
  import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOkResponse,
    ApiParam,
  } from '@nestjs/swagger';
  import { Body, Post } from '@nestjs/common/decorators';
  
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @Controller(UserType.USER + '/users')
  @UseGuards(AuthGuard)
  export class UsersUserController {
    constructor(
      private readonly usersService: UsersService,
    ) {}
  
    @Get('profile')
    @ApiOkResponse()
    async getProfile(@Request() req) {
      // Get the user
      const user = await this.usersService.findOne(+req.user['userId']);
  
      return user;
    }
  }
  