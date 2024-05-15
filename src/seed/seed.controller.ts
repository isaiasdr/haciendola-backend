import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiResponse({ status: 201, description: 'run seed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  executeSeed() {
    return this.seedService.runSeed();
  }
}
