import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { ChipComponent } from '../chip/chip.component';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, IconComponent, ChipComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly themeService = inject(ThemeService);
}
