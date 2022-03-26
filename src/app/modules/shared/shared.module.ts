import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      ReactiveFormsModule,
      NgSelectModule
    ], exports: [
      CommonModule,
      FormsModule,
      RouterModule,
      ReactiveFormsModule,
      NgSelectModule
    ]
  })
  export class SharedModule { }
