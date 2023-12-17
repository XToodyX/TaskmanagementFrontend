import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import {Task} from '../shared/Task';
import {TaskCreation} from '../shared/TaskCreation';
import {TaskUpdate} from '../shared/TaskUpdate';
import {NotificationService} from './notification.service';
import {Router} from '@angular/router';

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
            this.notificationService.createErrorNotification('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
            this.router.navigate(['login']).then(() => {});
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
              this.notificationService.createErrorNotification('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
              this.router.navigate(['login']).then(() => {});
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
          this.notificationService.createSuccessNotification('Aufgabe erfolgreich erstellt.');
          this.router.navigate(['../tasks']).then(() => {});
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
            if (httpErrorResponse.status === 401) {
              this.notificationService.createErrorNotification('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
              this.router.navigate(['login']).then(() => {});
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
              this.notificationService.createErrorNotification('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
              this.router.navigate(['login']).then(() => {});
            } else {
              this.notificationService.createErrorNotification(
                httpErrorResponse.error.message ? httpErrorResponse.error.message :
                  'Aufgabe nicht aktualisiert werden. Bitte versuche es später erneut.');
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
