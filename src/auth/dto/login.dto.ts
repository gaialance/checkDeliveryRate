import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  readonly emailOrUsername: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  readonly password: string;
}

export class LoginSwaggerDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  readonly password: string;
}
