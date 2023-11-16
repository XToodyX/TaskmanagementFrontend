import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {TaskService} from '../service/task.service';
import {Task} from '../shared/Task';
import {LadenEnum} from '../shared/LadenEnum';

@Component({
  selector: 'app-task-creation',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatCardModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './task-creation.component.html',
  styleUrl: './task-creation.component.scss'
})
export class TaskCreationComponent {

  protected readonly LadenEnum = LadenEnum;

  assignees: string[] = ['Max Müller', 'Sonja Bernd'];

  taskCreationForm = this.formBuilder.group({
    subject: this.formBuilder.control('', [Validators.required]),
    description: this.formBuilder.control('', [Validators.required]),
    location: this.formBuilder.control(LadenEnum.Zentrale, [Validators.required]),
    creator: this.formBuilder.control('', [Validators.required]),
    assignee: this.formBuilder.control('', [Validators.required])
  });

  constructor(private readonly taskService: TaskService,
              private formBuilder: NonNullableFormBuilder,
              private router: Router) { }

  onSubmit(): void {
    const newTask: Task = {
      subject: this.taskCreationForm.controls.subject.value,
      description: this.taskCreationForm.controls.description.value,
      creator: this.taskCreationForm.controls.creator.value,
      location: this.taskCreationForm.controls.location.value,
      assignee: this.taskCreationForm.controls.assignee.value
    };

    this.taskService.createTask(newTask).subscribe({
      next: () => {
        console.log('Erfolgreich angelegt');
        this.taskCreationForm.reset();
        this.routeTaskList();
      }, error: () => {
        console.log('Es ist etwas schief gelaufen, bitte versuche es erneut');
      }});
  }

  routeTaskList() {
    this.router.navigate(['../taskList']).then(() => {});
  }
}
