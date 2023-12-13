import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { MessageCreateDto } from './dto/message-create.dto';
import { Message } from './model/message.model';
import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/Roles.enum';
import { JwtGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('/api/v1/messages')
export class MessageController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles(Role.JOON)
  async create(@Body() messageCreateDto: MessageCreateDto) {
    const message = Message.of(messageCreateDto);
    await this.firebaseService.insert('messages', message);
  }
}
