import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: "", 
        component: DashboardComponent,
        loadChildren: () => import("src/app/modules/dashboard/index/index.module").then(m => m.IndexModule)
    }
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class DashboardModule { }
