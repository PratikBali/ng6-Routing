import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const MyRoute: Routes =
[
  { path: '' , component: HomeComponent},
  { path: 'users' , component: UsersComponent, children: [
    { path: ':id/:name' , component: UserComponent},
  ]},
  { path: 'servers' ,
  canActivateChild: [AuthGuard],
  // canActivate:[AuthGuard],
  component: ServersComponent, children: [
    { path: ':id' , component: ServerComponent, resolve: {server: ServerResolver}},
    { path: ':id/edit' ,
      component: EditServerComponent,
      canDeactivate: [CanDeactivateGuard]
    },
  ]},
  { path: 'notfound' , component: PageNotFoundComponent},
  { path: 'error' , component: ErrorPageComponent, data: {message: 'Page Not Found!'}},
  { path: '**' , redirectTo: '/notfound'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(MyRoute, {useHash: true})
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {

}
