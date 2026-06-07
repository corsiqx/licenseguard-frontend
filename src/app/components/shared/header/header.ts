import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Layout } from '../../../services/layout/layout';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly layout = inject(Layout);
}
