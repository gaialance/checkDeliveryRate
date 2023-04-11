/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UploadedFile,
    UseInterceptors,
    StreamableFile,
    UseGuards,
    Request,
    ClassSerializerInterceptor,
    SerializeOptions,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { AuthGuard } from '../auth/guards/jwt-auth.guard';
  import {
    ApiBearerAuth,
    ApiConsumes,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiUnprocessableEntityResponse,
    ApiBody,
  } from '@nestjs/swagger';
  import { UserType } from './enums/user-type.enum';
  import { ADMIN_GROUP } from './entities/user.entities';
  import { FindAllQueryDto } from './dto/find-all-query.dto';
  
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    groups: [ADMIN_GROUP],
  })
  @Controller(UserType.ADMIN + '/users')
  @UseGuards(AuthGuard)
  export class UsersAdminController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'Create user',
      type: CreateUserDto,
    })
    @ApiCreatedResponse()
    @ApiUnprocessableEntityResponse()
    @UseInterceptors(FileInterceptor('image'))
    async create(
      @Body() createUserDto: CreateUserDto,
    ) {
      return await this.usersService.create(createUserDto)
    }
  
    @Get()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOkResponse()
    async findAll(@Query() query: FindAllQueryDto) {
      return await this.usersService.findAll(query)
    }
  
    @Get('profile')
    @ApiOkResponse()
    async getProfile(@Request() req) {
      const user = await this.usersService.findOneOrFail(+req.user['userId']);
      return user
    }
  
    @Get(':id')
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiParam({ name: 'id', type: Number })
    async findOne(@Param('id') id: string) {
        await this.usersService.findOneOrFail(+id)
    }
  
    @Patch(':id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'Update user',
      type: UpdateUserDto,
    })
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiUnprocessableEntityResponse()
    @ApiParam({ name: 'id', type: Number })
    @UseInterceptors(FileInterceptor('image'))
    async update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ) {
        await this.usersService.update(+id, updateUserDto)
    }
  
    // @Delete(':id')
    // @ApiOkResponse()
    // @ApiNotFoundResponse()
    // @ApiParam({ name: 'id', type: Number })
    // async remove(@Param('id') id: string) {
    //   return await this.usersService.remove(+id)
    // }
  }
  