import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { MessageCreateDto } from './dto/message-create.dto';
import { MessageNotFoundException } from '../global/error/exceptions/message.exception';

@Controller('/api/v1/messages')
export class MessageController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  async create(@Body() messageCreateDto: MessageCreateDto) {
    throw new MessageNotFoundException();
  }
}
