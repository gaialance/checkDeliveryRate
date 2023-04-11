import { Body, Controller, Post, HttpCode, HttpStatus,Request, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginSwaggerDto } from './dto/login.dto';
import { 
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBody,
 } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    description: 'Login field',
    type: LoginSwaggerDto,
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async login(@Body() loginSwaggerDto : LoginSwaggerDto) {
    if (loginSwaggerDto.username) {
      return await this.authService.login(loginSwaggerDto.username,loginSwaggerDto.password)
    }

    throw new NotFoundException('User not found');
  }

}