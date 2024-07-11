import {Component, signal, WritableSignal} from '@angular/core';
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
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NotificationService} from '../service/notification.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-creation',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatCardModule, MatIconModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSelectModule, RouterLink, MatProgressSpinnerModule, MatCheckboxModule],
  templateUrl: './task-creation.component.html',
  styleUrl: './task-creation.component.scss'
})
export class TaskCreationComponent {

  images: string[] = [];

  taskCreationForm = this.formBuilder.group({
    subject: this.formBuilder.control('', [Validators.required]),
    description: this.formBuilder.control('', [Validators.required]),
    location: this.formBuilder.control(''),
    creator: this.formBuilder.control('', [Validators.required]),
    assigneeUsername: this.formBuilder.control('', [Validators.required]),
    privateTask: this.formBuilder.control(false)
  });

  protected readonly LadenEnum = LadenEnum;
  protected readonly ClaimEnum = ClaimEnum;
  loading: WritableSignal<boolean> = signal(false);


  constructor(private readonly taskService: TaskService,
              private formBuilder: NonNullableFormBuilder,
              private router: Router,
              readonly authService: AuthService,
              private notificationService: NotificationService) { }

  onSubmit(): void {
    this.loading.set(true);

    const newTask: TaskCreation = {
      subject: this.taskCreationForm.controls.subject.value,
      description: this.taskCreationForm.controls.description.value,
      location: this.taskCreationForm.controls.location.value,
      creator: this.taskCreationForm.controls.creator.value,
      assigneeUsername: this.taskCreationForm.controls.assigneeUsername.value,
      privateTask: this.taskCreationForm.controls.privateTask.value,
      images: this.images
    };

    this.taskService.createTask(newTask).subscribe({
      next: () => {
        this.taskCreationForm.reset();
        this.loading.set(false);
      }, error: () => {
        this.loading.set(false);
      }});
  }

  onFileSelected(event: any) {
    const fileList: File[] = event.target.files;
    this.images = [];

    for (const file of fileList) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.images.push(reader.result as string);
      };
    }
  }
}
