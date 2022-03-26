import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { AccordionGroupComponent } from './accordion-group.component';

@Component({
  selector: 'accordion',
  template: `
    <ng-content></ng-content>
`,
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent  implements AfterContentInit {
  @ContentChildren(AccordionGroupComponent) 
  groups: QueryList<AccordionGroupComponent>;

  ngAfterContentInit() {
    this.groups.toArray()[0].opened = true;
    this.groups.toArray().forEach((t) => {
      t.toggle.subscribe(() => {
        this.openGroup(t);
      });
    });
  }

  openGroup(group: any) {
    this.groups.toArray().forEach((t) => t.opened = false);

    group.opened = true;
  }
}
