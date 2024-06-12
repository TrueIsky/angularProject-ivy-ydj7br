import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { DetailComponent } from './components/detail/detail.component';
import { MiddleInfoComponent } from './components/middle-info/middle-info.component';
import { ChatComponent } from './components/chat/chat.component';

import { AuthGuard } from './helpers/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, outlet: 'main' },
      {
        path: 'main',
        component: MainComponent,
        outlet: 'main',
        canActivate: [AuthGuard],
        children: [
          { path: 'detail/:id', component: DetailComponent, outlet: 'middle' },
          { path: 'info', component: MiddleInfoComponent, outlet: 'middle' },
          { path: '', redirectTo: 'info', pathMatch: 'full', outlet: 'middle' },
          { path: '**', redirectTo: 'info', outlet: 'middle' },
          { path: 'chat/:id', component: ChatComponent, outlet: 'right' },
        ],
      },
      { path: '', redirectTo: 'main', pathMatch: 'full', outlet: 'main' },
      { path: '**', redirectTo: 'main', outlet: 'main' },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
