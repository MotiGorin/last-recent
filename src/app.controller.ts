import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateKeyDto } from './create_key.dto';

@Controller()
@ApiTags('last-recent')
export class AppController {
  constructor(private readonly appService: AppService) {}


  
  @Get()
  @ApiExcludeEndpoint()
  async hello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get(':key')
  async getKey(@Param('key') key: string): Promise<string> {
   const keyValue = await this.appService.getKey(key);
   const moti ='sdf';
   
    if(keyValue.lastRecent === undefined)
      throw new NotFoundException('Key Not Found');
    
    return (await this.appService.getKey(key)).value;
  }

  @Post()
  @ApiResponse({type: String, status: 200})
  async createKey(@Body() createKeyDto: CreateKeyDto): Promise<string> {
    if(createKeyDto.name === undefined || createKeyDto.value === undefined)
    throw new BadRequestException();
  
    return (await this.appService.setKey(createKeyDto.name, createKeyDto.value)).value;
  }
}
