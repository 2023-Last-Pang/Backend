import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyCodeDto {
  @ApiProperty({
    description: '팀 준에게만 공유된 인증코드',
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsNotEmpty()
  readonly code: string;
}
