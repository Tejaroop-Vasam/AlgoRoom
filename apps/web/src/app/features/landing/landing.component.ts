import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Room } from '../../services/api';
import { ButtonComponent, IconComponent, ModalService } from '../../shared';
import { CreateRoomModalComponent } from '../create-room/create-room-modal.component';
import { JoinRoomModalComponent, JoinRoomModalData } from '../join-room/join-room-modal.component';
import { ModePreviewComponent } from './mode-preview/mode-preview.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonComponent, ModePreviewComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  host: {
    class: 'd-block',
  },
})
export class LandingComponent implements OnInit {
  private readonly modalService = inject(ModalService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const joinCode = this.route.snapshot.queryParamMap.get('join');
    if (joinCode) {
      this.router.navigate([], { queryParams: { join: null }, queryParamsHandling: 'merge', replaceUrl: true });
      this.openJoinRoom(joinCode);
    }
  }

  async openCreateRoom(): Promise<void> {
    const dialog = this.modalService.open<CreateRoomModalComponent, Room>(CreateRoomModalComponent, {
      title: 'Create Room',
      showEscHint: true,
      width: '60rem',
      maxWidth: '95vw',
    });
    const room = await firstValueFrom(dialog.afterClosed());
    if (room) await this.router.navigate(['/room', room.code]);
  }

  async openJoinRoom(code?: string): Promise<void> {
    const dialog = this.modalService.open<JoinRoomModalComponent, Room>(JoinRoomModalComponent, {
      title: 'Join with Code',
      description: 'Enter the room code your host shared with you',
      icon: 'key',
      showEscHint: true,
      width: '28rem',
      data: { code } satisfies JoinRoomModalData,
    });
    const room = await firstValueFrom(dialog.afterClosed());
    if (room) await this.router.navigate(['/room', room.code]);
  }
}
