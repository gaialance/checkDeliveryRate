import { Body, Controller, Post } from '@nestjs/common';
import { SumsArrayService } from './sums-array.service';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { SumsArrayDto } from './dto/sums-array.dto'

@Controller('sums-array')
export class SumsArrayController {
  constructor(private readonly sumsArrayService: SumsArrayService) {}

  @Post()
  @ApiConsumes("application/x-www-form-urlencoded")
  @ApiBody({
    description: 'Check Sums',
    type: SumsArrayDto
  })
  @ApiOkResponse()
  @ApiUnprocessableEntityResponse()
  async create(@Body() sumsArrayDto:SumsArrayDto){
    return this.sumsArrayService.create(sumsArrayDto);
  }
}
