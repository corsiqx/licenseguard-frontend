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

  // Welche Navigationsgruppen aufgeklappt sind.
  private readonly openGroups = signal(new Set<string>(['dashboard', 'lizenzen']));

  toggleGroup(key: string): void {
    const next = new Set(this.openGroups());
    next.has(key) ? next.delete(key) : next.add(key);
    this.openGroups.set(next);
  }

  isOpen(key: string): boolean {
    return this.openGroups().has(key);
  }
}
