/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  Matches,
  IsArray,
  IsEmail,
} from 'class-validator';
import { UserType } from '../enums/user-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../enums/status.enum';

export class CreateUserDto {
  @ApiProperty({ type: 'string' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: 'Username must be alphanumeric or dash or underscore',
  })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  readonly contact?: string;

  @ApiProperty({ enum: UserType })
  @IsEnum(UserType)
  @IsNotEmpty()
  readonly userType: string;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  @IsOptional()
  readonly status: string;
}