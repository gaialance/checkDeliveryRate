/* eslint-disable prettier/prettier */
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Status } from '../enums/status.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

