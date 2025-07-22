import { ChangeDetectionStrategy, Component, OnDestroy, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-filter',
  imports: [
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input
      type="text"
      placeholder="Type some text"
      [(ngModel)]="value"
      (ngModelChange)="valueChange()">`,
})
export class TextFilter implements OnDestroy {
  readonly valueDidChange = output<string>();

  protected readonly value = signal('');
  protected timeoutRef: number | undefined = undefined;

  ngOnDestroy() {
    clearTimeout(this.timeoutRef);
  }

  valueChange() {
    clearTimeout(this.timeoutRef);

    this.timeoutRef = setTimeout(() => {
      this.valueDidChange.emit(this.value());
    }, 500);
  }
}
