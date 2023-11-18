import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../shared/Task';
import {TaskCreation} from '../shared/TaskCreation';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly httpClient: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('http://localhost:8080/api/v1/tasks?username=dommi420', { headers: this.getHeaders() });
  }

  createTask(task: TaskCreation): Observable<Task> {
    return this.httpClient.post<Task>('http://localhost:8080/api/v1/tasks', task, { headers: this.getHeaders()});
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>('http://localhost:8080/api/v1/tasks', task, { headers: this.getHeaders() });
  }

  private getHeaders() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    return {'Authorization': `Bearer ${token}`};
  }
}
