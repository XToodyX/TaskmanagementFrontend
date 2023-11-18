import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule, MatButtonModule, RouterLink, MatSelectModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements AfterViewInit, OnInit {

  protected readonly StatusEnum = StatusEnum;

  displayedColumns: string[] = ['subject', 'creationDate', 'location', 'status'];

  dataSource: MatTableDataSource<Task> = new MatTableDataSource();

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private router: Router,
              private readonly taskService: TaskService) {}

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
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
    this.router.navigate(['./taskCreation']).then(() => {});
  }

  onTaskChange(task: Task) {
    // --> Sending backend request with task id that i first have to implement in the backend
    this.taskService.updateTask(task).subscribe((data: Task) => {
      console.log('It worked good');
      console.log(data);
    });
  }
}
