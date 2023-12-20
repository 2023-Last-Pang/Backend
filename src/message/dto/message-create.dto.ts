import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MessageCreateDto {
  @ApiProperty({
    description: '닉네임',
    required: true,
  })
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({
    description: '닉네임',
    required: true,
  })
  @IsString()
  @MaxLength(200) //TODO 임시 설정
  @IsNotEmpty()
  content: string;
}
