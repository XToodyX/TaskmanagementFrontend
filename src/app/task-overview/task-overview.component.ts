import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {TaskListComponent} from '../task-list/task-list.component';

@Component({
  selector: 'app-task-overview',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TaskListComponent],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss'
})
export class TaskOverviewComponent {

}
