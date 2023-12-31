import { MessageCreateDto } from '../dto/message-create.dto';

export class Message {
  nickname: string;
  content: string;

  private constructor() {
    // private constructor
  }

  static of(messageCreateDto: MessageCreateDto): Message {
    const message = new Message();
    message.nickname = messageCreateDto.nickname;
    message.content = messageCreateDto.content;
    return message;
  }
}
