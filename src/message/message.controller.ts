import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { MessageCreateDto } from './dto/message-create.dto';
import { Message } from './model/message.model';

@Controller('/api/v1/messages')
export class MessageController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  async create(@Body() messageCreateDto: MessageCreateDto) {
    const message = Message.of(messageCreateDto);
    await this.firebaseService.insert('messages', message);
  }
}