import { Route } from '@angular/router';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskCreationComponent} from './task-creation/task-creation.component';
import {authenticationGuard} from './auth/guard/auth.guard';
import {LoginComponent} from './login/login.component';

export const appRoutes: Route[] = [
  {path: 'myTasks', component: TaskListComponent, canActivate: [authenticationGuard()]},
  {path: 'taskCreation', component: TaskCreationComponent, canActivate: [authenticationGuard()]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];
