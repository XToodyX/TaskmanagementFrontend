import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {StatusEnum} from '../shared/StatusEnum';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TaskService} from '../service/task.service';
import {Task} from '../shared/Task';
import {MatSelectModule} from '@angular/material/select';
import {TaskUpdate} from '../shared/TaskUpdate';
import {AuthService} from '../auth/auth.service';
import {ClaimEnum} from '../shared/ClaimEnum';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule, MatButtonModule, RouterLink, MatSelectModule, MatTabsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements AfterViewInit, OnInit {

  protected readonly StatusEnum = StatusEnum;

  @Input() archived: boolean = false;

  displayedColumns: string[] = ['subject', 'creationDate', 'location', 'status'];

  dataSource: MatTableDataSource<Task> = new MatTableDataSource();

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private router: Router,
              private readonly taskService: TaskService,
              readonly authService: AuthService) {}

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit() {
    this.taskService.getTasks(this.archived).subscribe((tasks: Task[]) => {
      tasks.forEach((task: Task) => {
        const newData: Task[] = [ ...this.dataSource.data];
        newData.push(task);
        this.dataSource.data = newData;
      });
    });
  }

  ngAfterViewInit() {
    if (this.sort instanceof MatSort) {
      this.dataSource.sort = this.sort;
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  routeTaskCreation() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.router.navigate(['../taskCreation']).then(() => {});
  }

  onTaskChange(task: TaskUpdate) {
    // --> Sending backend request with task id that i first have to implement in the backend
    this.taskService.updateTask(task).subscribe(() => {});
  }

  protected readonly ClaimEnum = ClaimEnum;

  routeToTaskEdit(taskId: string) {
    this.router.navigate([`../myTasks/${taskId}`]).then(() => {});
  }
}
