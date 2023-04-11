/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../enums/status.enum';

class OrderQuery {
  @ApiProperty({ required: false, name: 'order[name]' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    required: false,
    name: 'order[direction]',
  })
  @IsString()
  @IsOptional()
  readonly direction?: string;
}

class SearchQuery {
  @ApiProperty({ required: false, type: 'string', name: 'search[uuid]' })
  @IsString()
  @IsOptional()
  readonly uuid?: string;

  @ApiProperty({ required: false, type: 'string', name: 'search[email]' })
  @IsString()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ required: false, type: 'string', name: 'search[name]' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ required: false, type: 'string', name: 'search[username]' })
  @IsString()
  @IsOptional()
  readonly username?: string;

  @ApiProperty({ required: false, type: 'string', name: 'search[userType]' })
  @IsString()
  @IsOptional()
  readonly userType?: string;

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'search[startCreatedAt]',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly startCreatedAt?: number;

  @ApiProperty({
    required: false,
    type: 'number',
    name: 'search[endCreatedAt]',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly endCreatedAt?: number;

  @ApiProperty({
    required: false,
    enum: Status,
    name: 'search[status]',
  })
  @IsEnum(Status)
  @IsOptional()
  readonly status?: Status;
}

export class FindAllQueryDto {
  @ApiProperty({ required: false, type: 'number' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly page?: number;

  @ApiProperty({ required: false, type: 'number' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly perPage?: number;

  @ApiProperty({ required: false, type: OrderQuery })
  @ValidateNested({ each: true })
  @Type(() => OrderQuery)
  @IsObject()
  @IsOptional()
  readonly order?: OrderQuery;

  @ApiProperty({ required: false, type: SearchQuery })
  @ValidateNested({ each: true })
  @Type(() => SearchQuery)
  @IsObject()
  @IsOptional()
  readonly search?: SearchQuery;
}
