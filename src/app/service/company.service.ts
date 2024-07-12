import { Injectable } from '@angular/core';
import { CompanyCreation } from '../shared/CompanyCreation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { Company } from '../shared/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`http://localhost:8080/api/v1/companies`, { headers: this.getHeaders() })
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          if (httpErrorResponse.status === 401) {
            this.router.navigate(['login']).then(() => {
              this.notificationService.createErrorNotification('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
            });
          } else {
            this.notificationService.createErrorNotification(
              httpErrorResponse.error.message ? httpErrorResponse.error.message : 'Verfügbare Firmen konnten nicht geladen werden. Bitte versuche es später erneut.');
          }
          throw httpErrorResponse;
        }
      ));
  }

  createCompany(company: CompanyCreation) {
    return this.httpClient.post<Company>('http://localhost:8080/api/v1/companies', company, { headers: this.getHeaders()})
      .pipe(
        tap(() => {  
            this.notificationService.createSuccessNotification('Firma erfolgreich erstellt.');
        }),
        catchError((httpErrorResponse: HttpErrorResponse) => {
            if (httpErrorResponse.status === 401) {
              this.router.navigate(['login']).then(() => {
                this.notificationService.createErrorNotification('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
              });
            } else {
              this.notificationService.createErrorNotification(
                httpErrorResponse.error.message ? httpErrorResponse.error.message :
                  'Firma konnte nicht erstellt werden. Bitte versuche es später erneut.');
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
