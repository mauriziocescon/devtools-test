import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { TextFilter } from './text-filter';

import { UsersStore } from './users-store';

@Component({
  selector: 'app-users-page',
  imports: [
    TextFilter,
    JsonPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="margin-bottom: 1.5rem;">
      <app-text-filter (valueDidChange)="textSearchDidChange($event)" />
    </div>

    @for (user of usersStore.users(); track user.id) {
      <div>{{ user.id | json }}</div>
      <hr>
    }

    @if (usersStore.loading()) {
      <div>Loading</div>
    } @else if (usersStore.hasNoData()) {
      <div>Empty</div>
    } @else if (usersStore.shouldRetry()) {
      <div>Error: {{ usersStore.error() }}</div>
      <button type="button" (click)="retry()">Retry</button>
    }`,
})
export class UsersPage {
  protected readonly usersStore = inject(UsersStore);

  protected textSearchDidChange(textSearch: string) {
    this.usersStore.updateParams({ textSearch });
  }

  protected retry() {
    this.usersStore.retry();
  }
}
