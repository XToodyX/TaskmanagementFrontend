import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {LadenEnum} from '../shared/LadenEnum';
import {StatusEnum} from '../shared/StatusEnum';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

export interface TaskItem {
  id: number;
  betreff: string;
  datum: Date;
  laden: LadenEnum;
  status: StatusEnum;
}

const TASK_DATA: TaskItem[] = [
  {id: 1, betreff: 'Lampe reparieren', datum: new Date(2023, 10, 9), laden: LadenEnum.Bamberg, status: StatusEnum.InArbeit},
  {id: 2, betreff: 'Alte Tür erneuern', datum: new Date(2023, 10, 3), laden: LadenEnum.Coburg, status: StatusEnum.Blockiert},
  {id: 3, betreff: 'Kaffeemaschine geht nicht mehr an', datum: new Date(2023, 8, 2), laden: LadenEnum.Bamberg, status: StatusEnum.Erledigt}
];

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'betreff', 'erstellungsdatum', 'laden', 'status'];
  dataSource = new MatTableDataSource(TASK_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router) {}

  @ViewChild(MatSort) sort: MatSort | undefined;

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

  protected readonly StatusEnum = StatusEnum;

  routeTaskCreation() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.router.navigate(['./taskCreation']).then(() => {});
  }
}
