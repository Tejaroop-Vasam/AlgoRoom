import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomDto, RoomPreviewDto } from './dto/room-response.dto';
import { GetUser } from './decorators/get-user.decorator';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room instance' })
  @ApiResponse({ status: 201, description: 'Room created successfully', type: RoomDto })
  async createRoom(
    @Body() dto: CreateRoomDto,
  ) {
    return this.roomsService.create(dto);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get preview for a room by code' })
  @ApiResponse({ status: 200, description: 'Room preview details', type: RoomPreviewDto })
  async getRoomPreview(@Param('code') code: string): Promise<RoomPreviewDto> {
    return this.roomsService.getPreview(code);
  }

  @Post(':code/join')
  @ApiOperation({ summary: 'Join a room by code' })
  @ApiResponse({ status: 200, description: 'Joined room details', type: RoomDto })
  async joinRoom(
    @Param('code') code: string,
    @Body() body?: { username?: string },
  ) {
    return this.roomsService.join(code, body?.username);
  }
}
