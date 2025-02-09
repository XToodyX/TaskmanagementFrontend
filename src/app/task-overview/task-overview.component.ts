import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import {TaskListComponent} from '../task-list/task-list.component';
import { TaskService } from '../service/task.service';
import { StatusEnum } from '../shared/StatusEnum';

@Component({
  selector: 'app-task-overview',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TaskListComponent],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss'
})
export class TaskOverviewComponent implements OnInit {
  activeTab: string = 'open';

  openCount: number = 0;
  privateCount: number = 0;
  doneCount: number = 0;

  constructor(private taskService: TaskService) {}

  onTabChange($event: MatTabChangeEvent) {
    switch ($event.index) {
      case 0:
        this.activeTab = 'open';
        break;
      case 1:
        this.activeTab = 'private';
        break;
      case 2:
        this.activeTab = 'done';
        break;
    }
  }

  ngOnInit() {
    this.taskService.getTasksByStatus('open').subscribe((openCount) => {
      this.openCount = openCount;
    })

    this.taskService.getTasksByStatus('private').subscribe((privateCount) => {  
      this.privateCount = privateCount;
    })

    this.taskService.getTasksByStatus('done').subscribe((doneCount) => {
      this.doneCount = doneCount;
    })
  }
}
