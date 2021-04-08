import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateKeyDto } from './create_key.dto';

@Controller()
@ApiTags('last-recent')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':key')
  async getKey(@Param('key') key: string): Promise<string> {
    return (await this.appService.getKey(key)).value;
  }

  @Post()
  @ApiResponse({type: String, status: 200})
  async createKey(@Body() createKeyDto: CreateKeyDto): Promise<string> {
    return (await this.appService.setKey(createKeyDto.name, createKeyDto.value)).value;
  }
}
