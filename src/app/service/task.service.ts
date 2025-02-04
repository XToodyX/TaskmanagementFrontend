import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import {Task} from '../shared/Task';
import {TaskCreation} from '../shared/TaskCreation';
import {TaskUpdate} from '../shared/TaskUpdate';
import {NotificationService} from './notification.service';
import {Router} from '@angular/router';
import { StatusEnum } from '../shared/StatusEnum';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) { }

  getTasks(tab: string | undefined): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`http://localhost:8080/api/v1/tasks?tabGroup=${tab}`, { headers: this.getHeaders() })
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          if (httpErrorResponse.status === 401) {
            this.router.navigate(['login']).then(() => {
              this.notificationService.createErrorNotification('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
            });
          } else {
            this.notificationService.createErrorNotification(
              httpErrorResponse.error.message ? httpErrorResponse.error.message : 'Aufgaben konnten nicht geladen werden. Bitte versuche es später erneut.');
          }
          throw httpErrorResponse;
        }
      ));
  }

  getTaskById(taskId: number | undefined): Observable<Task> {
    // On empty taskId (basically not possible) send message to notification service to create error message
    return this.httpClient.get<Task>(`http://localhost:8080/api/v1/tasks/${taskId}`, { headers: this.getHeaders() })
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
            if (httpErrorResponse.status === 401) {
              this.router.navigate(['login']).then(() => {
                this.notificationService.createErrorNotification('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
              });
            } else {
              this.notificationService.createErrorNotification(
                httpErrorResponse.error.message ? httpErrorResponse.error.message : 'Aufgabe konnten nicht geladen werden. Bitte versuche es später erneut.');
            }
            throw httpErrorResponse;
          }
        ));
  }
  createTask(task: TaskCreation): Observable<Task> {
    return this.httpClient.post<Task>('http://localhost:8080/api/v1/tasks', task, { headers: this.getHeaders()})
      .pipe(
        tap(() => {
          this.router.navigate(['../tasks']).then(() => {
            this.notificationService.createSuccessNotification('Aufgabe erfolgreich erstellt.');
          });
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
            if (httpErrorResponse.status === 401) {
              this.router.navigate(['login']).then(() => {
                this.notificationService.createErrorNotification('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
              });
            } else {
              this.notificationService.createErrorNotification(
                httpErrorResponse.error.message ? httpErrorResponse.error.message :
                  'Aufgabe konnte nicht erstellt werden. Bitte versuche es später erneut.');
            }
            throw httpErrorResponse;
          }
        ));
  }

  updateTask(task: TaskUpdate): Observable<Task> {
    return this.httpClient.put<Task>('http://localhost:8080/api/v1/tasks', task, { headers: this.getHeaders() })
      .pipe(
        tap(() => {
          this.router.navigate(['../tasks']).then(() => {});
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
            if (httpErrorResponse.status === 401) {
              this.router.navigate(['login']).then(() => {
                this.notificationService.createErrorNotification('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
              });
            } else {
              this.notificationService.createErrorNotification(
                httpErrorResponse.error.message ? httpErrorResponse.error.message :
                  'Aufgabe nicht aktualisiert werden. Bitte versuche es später erneut.');
            }
            throw httpErrorResponse;
          }
        ));
  }

  getTasksByStatus(status: String): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:8080/api/v1/tasks/countByStatus?status=${status}`, { headers: this.getHeaders() })
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          if (httpErrorResponse.status === 401) {
            this.router.navigate(['login']).then(() => {
              this.notificationService.createErrorNotification('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
            });
          } else {
            this.notificationService.createErrorNotification(
              httpErrorResponse.error.message ? httpErrorResponse.error.message : 'Anzahl für Aufgaben der jeweilige Tabgruppe konnte nicht geladen werden');
          }
          throw httpErrorResponse;
        }
      ));
  }

  private getHeaders() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    return {'Authorization': `Bearer ${token}`};
  }
}
