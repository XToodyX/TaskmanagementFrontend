import {Route} from '@angular/router';
import {TaskCreationComponent} from './task-creation/task-creation.component';
import {authenticationGuard} from './auth/guard/auth.guard';
import {LoginComponent} from './login/login.component';
import {TaskEditComponent} from './task-edit/task-edit.component';
import {TaskOverviewComponent} from './task-overview/task-overview.component';

export const appRoutes: Route[] = [
  {path: 'tasks/:id', component: TaskEditComponent, canActivate: [authenticationGuard()]},
  {path: 'tasks', component: TaskOverviewComponent, canActivate: [authenticationGuard()]},
  {path: 'taskCreation', component: TaskCreationComponent, canActivate: [authenticationGuard()]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];
