import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomDto, RoomPreviewDto } from './dto/room-response.dto';
import { GetUser } from './decorators/get-user.decorator';

@ApiTags('Rooms')
@ApiBearerAuth()
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room instance' })
  @ApiResponse({ status: 201, description: 'Room created successfully', type: RoomDto })
  async createRoom(
    @GetUser() user: { id: string; username: string },
    @Body() dto: CreateRoomDto,
  ) {
    return this.roomsService.create(dto, user);
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
    @GetUser() user: { id: string; username: string },
    @Param('code') code: string,
  ) {
    return this.roomsService.join(code, user);
  }
}