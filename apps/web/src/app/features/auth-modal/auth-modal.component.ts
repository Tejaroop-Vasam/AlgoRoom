import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ModalContainerComponent } from '../../shared/components/modal/modal-container.component';
import { UsersApiService } from '../../services/api';
import { AuthSessionService } from '../../services/auth-session.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-auth-modal',
  imports: [ButtonComponent, InputComponent],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css',
})
export class AuthModalComponent {
  private readonly container = inject(ModalContainerComponent);
  private readonly users = inject(UsersApiService);
  private readonly session = inject(AuthSessionService);

  readonly registering = signal(false);
  readonly username = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly loading = inject(LoadingService).isLoading;

  toggleMode(): void {
    this.registering.update(value => !value);
  }

  async submit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    if (this.loading()) return;
    const credentials = { email: this.email().trim(), password: this.password() };
    try {
      if (this.registering()) {
        await this.users.register({ ...credentials, username: this.username().trim() });
      }
      this.session.start(await this.users.login(credentials));
      this.container.close(true);
    } catch {}
  }
}
