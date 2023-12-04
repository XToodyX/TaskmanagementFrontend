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
    return this.httpClient.get<Task[]>('http://localhost:8080/api/v1/tasks', { headers: this.getHeaders() });
  }

  getTaskById(taskId: number | undefined): Observable<Task> {
    // On empty taskId (basically not possible) send message to notification service to create error message
    return this.httpClient.get<Task>(`http://localhost:8080/api/v1/tasks/${taskId}`, { headers: this.getHeaders() });
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
