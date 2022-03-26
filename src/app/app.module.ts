import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { BaseLayout } from './core/layouts/base/base.layout';
import { FooterLayout } from './core/layouts/footer/footer.layout';
import { HeaderLayout } from './core/layouts/header/header.layout';
import { NavbarLayout } from './core/layouts/navbar/navbar.layout';
import { AuthComponent } from './modules/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,

    BaseLayout,
    //AsideLayout,
    FooterLayout,
    HeaderLayout,
    NavbarLayout,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ preventDuplicates: true, closeButton: true, timeOut: 3000, progressBar: true, positionClass: 'toast-top-right'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
