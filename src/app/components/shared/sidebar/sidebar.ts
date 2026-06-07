import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Layout } from '../../../services/layout/layout';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  readonly layout = inject(Layout);

  // Nur eine Gruppe gleichzeitig offen.
  private readonly activeGroup = signal<string | null>('dashboard');

  toggleGroup(key: string): void {
    this.activeGroup.set(this.activeGroup() === key ? null : key);
  }

  isOpen(key: string): boolean {
    return this.activeGroup() === key;
  }
}
