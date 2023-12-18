import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import {TaskListComponent} from '../task-list/task-list.component';

@Component({
  selector: 'app-task-overview',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TaskListComponent],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss'
})
export class TaskOverviewComponent {
  activeTab: string = 'open';


  onTabChange($event: MatTabChangeEvent) {
    switch ($event.index) {
      case 0:
        this.activeTab = 'open';
        break;
      case 1:
        this.activeTab = 'forwarded';
        break;
      case 2:
        this.activeTab = 'done';
        break;
    }
  }
}
