import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BadgeComponent, ButtonComponent, Competitor, IconComponent, LiveGridComponent, ModalService } from '../../shared';
import { CreateRoomModalComponent } from '../create-room/create-room-modal.component';
import { JoinRoomModalComponent, JoinRoomModalData } from '../join-room/join-room-modal.component';

interface ModeFeature {
  label: string;
}

interface CoopCursor {
  name: string;
  label: string;
  tone: 'primary' | 'secondary' | 'tertiary';
}

type CodeTokenKind = 'kw' | 'type' | 'plain';

interface CodeToken {
  text: string;
  kind: CodeTokenKind;
}

interface CoopLine {
  indent: number;
  tokens: CodeToken[];
  cursor?: CoopCursor;
}

const kw = (text: string): CodeToken => ({ text, kind: 'kw' });
const type = (text: string): CodeToken => ({ text, kind: 'type' });
const plain = (text: string): CodeToken => ({ text, kind: 'plain' });

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [BadgeComponent, ButtonComponent, IconComponent, LiveGridComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  private readonly modalService = inject(ModalService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly raceFeatures: ModeFeature[] = [
    { label: 'Private isolated sandbox environments' },
    { label: 'Live runtime assertion telemetry' },
    { label: 'Real-time solve time locks & ELO updates' },
    { label: 'Zero-code exposure during live race' },
  ];

  readonly coopFeatures: ModeFeature[] = [
    { label: 'CRDT synchronized multi-cursor editor' },
    { label: 'Live peer presence & typing awareness' },
    { label: 'Integrated algorithmic whiteboard & discussion thread' },
    { label: 'Consensus-driven team test submission' },
  ];

  readonly raceDemo: Competitor[] = [
    { rank: 1, name: 'Rahul Sharma', status: '12/12 Tests', hasPassedTests: true, time: '12m 42s', progressPercent: 100 },
    { rank: 2, name: 'Teja (You)', isCurrentUser: true, status: 'Running T10...', time: '18m 42s', progressPercent: 67 },
    { rank: 3, name: 'Ananya Iyer', status: 'Editing Line 24', time: '18m 42s', progressPercent: 33 },
  ];

  readonly coopParticipants: CoopCursor[] = [
    { name: 'Teja', label: '@Teja', tone: 'primary' },
    { name: 'Rahul', label: '@Rahul typing...', tone: 'secondary' },
    { name: 'Ananya', label: '@Ananya', tone: 'tertiary' },
  ];

  readonly coopLines: CoopLine[] = [
    {
      indent: 0,
      tokens: [type('PriorityQueue'), plain('<int[]> pq = '), kw('new'), plain(' PriorityQueue<>((a, b) -> a[1] - b[1]);')],
      cursor: this.coopParticipants[0],
    },
    {
      indent: 0,
      tokens: [kw('while'), plain(' (!pq.isEmpty()) {')],
      cursor: this.coopParticipants[1],
    },
    {
      indent: 1,
      tokens: [type('int'), plain('[] curr = pq.poll();')],
      cursor: this.coopParticipants[2],
    },
    {
      indent: 1,
      tokens: [kw('if'), plain(' (d > dist[u]) '), kw('continue'), plain(';')],
    },
    { indent: 0, tokens: [plain('}')] },
  ];

  ngOnInit(): void {
    const joinCode = this.route.snapshot.queryParamMap.get('join');
    if (joinCode) {
      this.router.navigate([], { queryParams: { join: null }, queryParamsHandling: 'merge', replaceUrl: true });
      this.openJoinRoom(joinCode);
    }
  }

  openCreateRoom(): void {
    this.modalService.open(CreateRoomModalComponent, {
      eyebrow: 'Instance Config // Node 04',
      title: 'Deploy Arena Session',
      description: 'Configure match topology, permissions, and multi-problem challenge set',
      showEscHint: true,
      width: '60rem',
      maxWidth: '95vw',
    });
  }

  openJoinRoom(code?: string): void {
    this.modalService.open(JoinRoomModalComponent, {
      title: 'Join with Code',
      description: 'Enter the room code your host shared with you',
      icon: 'key',
      showEscHint: true,
      width: '28rem',
      data: { code } satisfies JoinRoomModalData,
    });
  }
}
