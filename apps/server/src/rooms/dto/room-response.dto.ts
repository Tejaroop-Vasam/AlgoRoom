import { ApiProperty } from '@nestjs/swagger';

export class RoomParticipantDto {
  @ApiProperty({ example: 'host-user-1' })
  id: string;

  @ApiProperty({ example: 'Host' })
  username: string;

  @ApiProperty({ example: true })
  isHost: boolean;
}

export class RoomSettingsDto {
  @ApiProperty({ example: 4 })
  maxParticipants: number;

  @ApiProperty({ example: true })
  hiddenTestCases: boolean;

  @ApiProperty({ example: 'OBSCURED', enum: ['OBSCURED', 'HOST_ONLY', 'OPEN'] })
  bufferVisibility: 'OBSCURED' | 'HOST_ONLY' | 'OPEN';
}

export class RoomDto {
  @ApiProperty({ example: 'room-1729060000000' })
  id: string;

  @ApiProperty({ example: 'ABCDEF' })
  code: string;

  @ApiProperty({ example: 'My Room' })
  name: string;

  @ApiProperty({ example: 'RACE', enum: ['RACE', 'COOP'] })
  mode: 'RACE' | 'COOP';

  @ApiProperty({ example: 'LOBBY', enum: ['LOBBY', 'IN_PROGRESS', 'FINISHED'] })
  status: 'LOBBY' | 'IN_PROGRESS' | 'FINISHED';

  @ApiProperty({ type: RoomParticipantDto })
  host: RoomParticipantDto;

  @ApiProperty({ type: [RoomParticipantDto] })
  participants: RoomParticipantDto[];

  @ApiProperty({ type: [Number], example: [1, 2] })
  problemIds: number[];

  @ApiProperty({ type: RoomSettingsDto })
  settings: RoomSettingsDto;

  @ApiProperty()
  createdAt: string;
}

export class RoomPreviewDto {
  @ApiProperty({ example: 'ABCDEF' })
  code: string;

  @ApiProperty({ example: 'My Room' })
  name: string;

  @ApiProperty({ example: 'RACE', enum: ['RACE', 'COOP'] })
  mode: 'RACE' | 'COOP';

  @ApiProperty({ example: 'LOBBY', enum: ['LOBBY', 'IN_PROGRESS', 'FINISHED'] })
  status: 'LOBBY' | 'IN_PROGRESS' | 'FINISHED';

  @ApiProperty({ example: 'Host' })
  hostName: string;

  @ApiProperty({ example: 1 })
  participantCount: number;

  @ApiProperty({ example: 4 })
  maxParticipants: number;

  @ApiProperty({ example: 2 })
  problemCount: number;
}
