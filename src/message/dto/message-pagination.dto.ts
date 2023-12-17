import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class MessagePaginationDto {
  @ApiProperty({ description: 'page', example: '1', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @ApiProperty({ description: 'limit', example: '10', required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(50)
  @Transform(({ value }) => Number(value))
  limit?: number = 10;
}
