import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {TaskService} from '../service/task.service';
import {LadenEnum} from '../shared/LadenEnum';
import {TaskCreation} from '../shared/TaskCreation';
import {AuthService} from '../auth/auth.service';
import {ClaimEnum} from '../shared/ClaimEnum';

@Component({
  selector: 'app-task-creation',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatCardModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSelectModule, RouterLink],
  templateUrl: './task-creation.component.html',
  styleUrl: './task-creation.component.scss'
})
export class TaskCreationComponent {

  taskCreationForm = this.formBuilder.group({
    subject: this.formBuilder.control('', [Validators.required]),
    description: this.formBuilder.control('', [Validators.required]),
    location: this.formBuilder.control(''),
    creator: this.formBuilder.control('', [Validators.required])
  });

  constructor(private readonly taskService: TaskService,
              private formBuilder: NonNullableFormBuilder,
              private router: Router,
              readonly authService: AuthService) { }

  onSubmit(): void {
    const newTask: TaskCreation = {
      subject: this.taskCreationForm.controls.subject.value,
      description: this.taskCreationForm.controls.description.value,
      creator: this.taskCreationForm.controls.creator.value,
      location: this.taskCreationForm.controls.location.value
    };

    this.taskService.createTask(newTask).subscribe({
      next: () => {
        this.taskCreationForm.reset();
        this.router.navigate(['../myTasks']).then(() => {});
      }, error: () => {

      }});
  }

  protected readonly LadenEnum = LadenEnum;
  protected readonly ClaimEnum = ClaimEnum;
}
