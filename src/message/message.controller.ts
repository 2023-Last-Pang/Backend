import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FirebaseService } from '../firebase/service/firebase.service';
import { MessageCreateDto } from './dto/message-create.dto';
import { Message } from './model/message.model';
import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enums/Roles.enum';
import { JwtGuard } from '../auth/guard/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('MESSAGES')
@UseGuards(JwtGuard)
@Controller('/api/v1/messages')
export class MessageController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @ApiOperation({ summary: '메세지 작성' })
  @ApiBearerAuth()
  @Post()
  @UseGuards(RoleGuard)
  @Roles(Role.JOON)
  async create(@Body() messageCreateDto: MessageCreateDto) {
    const message = Message.of(messageCreateDto);
    await this.firebaseService.insert('messages', message);
  }
}
