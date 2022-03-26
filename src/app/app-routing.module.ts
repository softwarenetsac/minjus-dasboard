import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayout } from './core/layouts/base/base.layout';
import { AuthComponent } from './modules/auth/auth.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: 'login' },
  { path: "login", component: AuthComponent, data: { title: "Iniciar sesión" } },
  {
    path: "dashboard",
    component: BaseLayout,
    canActivate: [],
    data: { title: "Panel Principal", roles: [] },
    loadChildren: () => import("src/app/modules/dashboard/dashboard.module").then(m => m.DashboardModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
