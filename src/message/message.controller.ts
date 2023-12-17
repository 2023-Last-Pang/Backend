import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FirebaseService } from '../firebase/service/firebase.service';
import { MessageCreateDto } from './dto/message-create.dto';
import { Message } from './model/message.model';
import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enums/Roles.enum';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessagePaginationDto } from './dto/message-pagination.dto';

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

  @ApiOperation({ summary: '메세지 조회' })
  @ApiBearerAuth()
  @Get()
  @UseGuards(RoleGuard)
  @Roles(Role.JOON, Role.TECHEER)
  async getAll(@Query() messagePaginationDto: MessagePaginationDto) {
    return await this.firebaseService.getAll('messages', messagePaginationDto);
  }
}
