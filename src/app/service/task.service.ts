import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Task } from '../shared/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly httpClient: HttpClient) { }

  getTasks(): Observable<Task> {
    const token = localStorage.getItem('token') ? localStorage.getItem('token'): '';
    const headers = { 'Authorization': `Bearer ${token}`};
    // @ts-ignore
    return this.httpClient.get<Task>('http://localhost:8080/api/v1/tasks', { headers });
  }
}
