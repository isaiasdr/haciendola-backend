import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'How many rows do you want?',
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 5;

  @ApiProperty({
    default: 0,
    description: 'How many rows do you want to skip?',
    required: false,
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  page?: number;
}
