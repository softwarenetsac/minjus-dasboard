import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'group',
  template: `
  <div class="tab border rounded my-2" [ngClass]="{'border-gray-500': !opened, 'border-red-600': opened}">
    <div class="cursor-pointer py-3 px-4 transition text-white" [ngClass]="{'bg-gray-500': !opened, 'bg-red-600': opened}" (click)="toggle.emit()">
      <i class="fas mr-2" [ngClass]="{'fa-plus': !opened, 'fa-minus': opened}"></i> {{title}}
    </div>
    <div class="body" [ngClass]="{'hidden': !opened}">
      <ng-content></ng-content>
    </div>
  <div>
  `,
  styleUrls: ['accordion.component.css'],
})
export class AccordionGroupComponent {
  @Input() opened = false;
  @Input() title: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
