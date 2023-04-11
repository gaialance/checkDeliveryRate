import { Controller, Request, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CheckRatesService } from './check-rates.service';
import { CheckRateDto } from './dto/check-rate.dto';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('check-rates')
@UseInterceptors(CacheInterceptor)
export class CheckRatesController {
  constructor(private readonly checkRatesService: CheckRatesService) {}
  
  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    description: 'Check rates',
    type: CheckRateDto,
  })
  @ApiOkResponse()
  @ApiUnprocessableEntityResponse()
  async create(@Body() checkRateDto : CheckRateDto,@Request() req) {
    return this.checkRatesService.getRates(checkRateDto,req.access_token);
  }
}
