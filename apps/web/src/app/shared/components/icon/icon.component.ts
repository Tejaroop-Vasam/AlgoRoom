import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconFamily = 'outlined' | 'rounded' | 'sharp' | 'classic';
export type IconSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | (string & {});

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  host: {
    'class': 'd-inline-flex items-center justify-center leading-none',
    '[attr.aria-hidden]': '!ariaLabel() ? "true" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.role]': 'ariaLabel() ? "img" : null'
  }
})
export class IconComponent {
  readonly name = input<string>('');
  readonly family = input<IconFamily>('outlined');
  readonly size = input<IconSize>('md');
  readonly filled = input<boolean>(false);
  readonly weight = input<number>(400);
  readonly grade = input<number>(0);
  readonly opticalSize = input<number | undefined>(undefined);
  readonly spin = input<boolean>(false);
  readonly color = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined);

  readonly familyClass = computed(() => {
    switch (this.family()) {
      case 'rounded':
        return 'material-symbols-rounded';
      case 'sharp':
        return 'material-symbols-sharp';
      case 'classic':
        return 'material-icons';
      case 'outlined':
      default:
        return 'material-symbols-outlined';
    }
  });

  readonly computedFontSize = computed(() => {
    const s = this.size();
    const presetMap: Record<string, string> = {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'base': '1rem',
      'md': '1.25rem',
      'lg': '1.5rem',
      'xl': '2rem',
      '2xl': '2.5rem',
      '3xl': '3rem',
      '4xl': '4rem'
    };
    return presetMap[s] ?? s;
  });

  readonly computedOpsz = computed(() => {
    const customOpsz = this.opticalSize();
    if (customOpsz !== undefined) {
      return customOpsz;
    }
    const s = this.size();
    if (s === 'xs' || s === 'sm') return 20;
    if (s === 'xl' || s === '2xl' || s === '3xl' || s === '4xl') return 48;
    return 24;
  });

  readonly fontVariationSettings = computed(() => {
    if (this.family() === 'classic') {
      return null;
    }
    const fill = this.filled() ? 1 : 0;
    const wght = this.weight();
    const grad = this.grade();
    const opsz = this.computedOpsz();
    return `'FILL' ${fill}, 'wght' ${wght}, 'GRAD' ${grad}, 'opsz' ${opsz}`;
  });
}
