import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DetailComponent } from './components/detail/detail.component';
import { MiddleInfoComponent } from './components/middle-info/middle-info.component';
import { ChatComponent } from './components/chat/chat.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UserListComponent,
    DetailComponent,
    MiddleInfoComponent,
    ChatComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
