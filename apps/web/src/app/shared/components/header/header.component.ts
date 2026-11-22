import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { ChipComponent } from '../chip/chip.component';
import { AuthModalComponent } from '../../../features/auth-modal/auth-modal.component';
import { AuthSessionService } from '../../../services/auth-session.service';
import { ButtonComponent } from '../button/button.component';
import { ModalService } from '../modal/modal.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent, ChipComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly modals = inject(ModalService);
  readonly session = inject(AuthSessionService);
  readonly themeService = inject(ThemeService);

  signIn(): void {
    this.modals.open(AuthModalComponent, { title: 'Sign in', width: '28rem' });
  }

  signOut(): void {
    this.session.end();
    void this.router.navigate(['/']);
  }
}
