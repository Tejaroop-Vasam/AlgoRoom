import { Component, signal } from '@angular/core';

import { ClashEmblemComponent } from '../../shared/clash-emblem/clash-emblem.component';
import { JoinRoomDialogComponent } from './join-room-dialog/join-room-dialog.component';

type GameMode = 'race' | 'coop';

interface RacePreviewRow {
  rank: string;
  name: string;
  badge: string;
  status: string;
  time: string;
  progress: string;
  isYou: boolean;
}

@Component({
  selector: 'app-landing-page',
  imports: [ClashEmblemComponent, JoinRoomDialogComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  readonly isJoinOpen = signal(false);
  readonly roomCode = signal('');
  readonly openMode = signal<GameMode | null>(null);

  readonly raceFeatures = [
    'Private isolated sandbox environments',
    'Live runtime assertion telemetry',
    'Real-time solve time locks & ELO updates',
    'Zero-code exposure during live race',
  ];

  readonly coopFeatures = [
    'CRDT synchronized multi-cursor editor',
    'Live peer presence & typing awareness',
    'Integrated algorithmic whiteboard & discussion thread',
    'Consensus-driven team test submission',
  ];

  readonly raceRows: RacePreviewRow[] = [
    { rank: '🥇 #1', name: 'Kartheek Pallem', badge: '1920 ELO', status: '✅ 12/12 Tests', time: '12m 42s', progress: 'w-full', isYou: false },
    { rank: '🥈 #2', name: 'Teja Vasam(You)', badge: 'YOU', status: 'Running T10...', time: '18m 42s', progress: 'w-2-3', isYou: true },
    { rank: '🥉 #3', name: 'Akhil Kaskurthi', badge: '1750 ELO', status: 'Editing Line 24', time: '18m 42s', progress: 'w-1-3', isYou: false },
  ];

  toggleMode(mode: GameMode): void {
    this.openMode.update((current) => (current === mode ? null : mode));
  }

  openCreate(): void {
    this.roomCode.set(this.generateRoomCode());
    this.isJoinOpen.set(true);
  }

  openJoin(): void {
    this.roomCode.set('');
    this.isJoinOpen.set(true);
  }

  closeJoin(): void {
    this.isJoinOpen.set(false);
  }

  private generateRoomCode(): string {
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    let prefix = '';
    for (let i = 0; i < 3; i++) {
      prefix += letters[Math.floor(Math.random() * letters.length)];
    }
    const digits = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${digits}`;
  }
}
