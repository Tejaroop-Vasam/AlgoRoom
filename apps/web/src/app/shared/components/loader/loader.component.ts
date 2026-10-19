import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  host: {
    class: 'd-contents',
  },
})
export class LoaderComponent {
  readonly loadingService = inject(LoadingService);
  readonly text = input<string>('');
}
