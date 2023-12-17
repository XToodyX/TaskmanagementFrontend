import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {LadenEnum} from '../shared/LadenEnum';
import {TaskService} from '../service/task.service';
import {StatusEnum} from '../shared/StatusEnum';
import {Task} from '../shared/Task';
import {TaskUpdate} from '../shared/TaskUpdate';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {ClaimEnum} from '../shared/ClaimEnum';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NotificationService} from '../service/notification.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent implements OnInit {

  taskId: number = 0;
  images: string[] = [];

  constructor(private readonly taskService: TaskService,
              private formBuilder: NonNullableFormBuilder,
              readonly authService: AuthService,
              private route: ActivatedRoute,
              private readonly router: Router,
              private readonly notificationService: NotificationService) { }

  ngOnInit() {
    if (!this.authService.hasClaim(ClaimEnum.CHANGE)) {
      this.taskEditForm.disable();
    }
    this.route.url.subscribe((value) => {
      this.taskId = +value[1].path;
    });
    this.taskService.getTaskById(this.taskId).subscribe((task: Task) => {
      this.taskEditForm.controls['subject'].setValue(task.subject);
      this.taskEditForm.controls['description'].setValue(task.description);
      this.taskEditForm.controls['location'].setValue(LadenEnum[task.location as keyof typeof LadenEnum]);
      this.taskEditForm.controls['creator'].setValue(task.creator);
      this.taskEditForm.controls['assignee'].setValue(task.assignee);
      if (task.status != undefined) {
        this.taskEditForm.controls['status'].setValue(task.status);
      }
      this.images = task.images;
      if (task.creationDate != null) {
        this.taskEditForm.controls['creationDate'].setValue(task.creationDate);
      }
      if (task.forwardedTo != undefined) {
        this.taskEditForm.controls['forwardedTo'].setValue(task.forwardedTo);
      }
    });
  }

  taskEditForm = this.formBuilder.group({
    subject: this.formBuilder.control('', [Validators.required]),
    description: this.formBuilder.control('', [Validators.required]),
    location: this.formBuilder.control('', [Validators.required]),
    creator: this.formBuilder.control('', [Validators.required]),
    assignee: this.formBuilder.control('', [Validators.required]),
    status: this.formBuilder.control(StatusEnum.Bearbeitung, [Validators.required]),
    forwardedTo: this.formBuilder.control(''),
    creationDate: this.formBuilder.control('', [Validators.required])
  });

  onSubmit() {
    this.loading.set(true);

    const task: TaskUpdate = {
      taskId: this.taskId,
      subject: this.taskEditForm.controls.subject.value,
      description: this.taskEditForm.controls.description.value,
      creator: this.taskEditForm.controls.creator.value,
      assignee: this.taskEditForm.controls.assignee.value,
      status: this.taskEditForm.controls.status.value,
      forwardedTo: this.taskEditForm.controls.forwardedTo.value,
      images: this.images
    };

    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['../tasks']).then(() => {
          this.notificationService.createSuccessNotification('Änderungen wurden erfolgreich gespeichert.');
        });
      }, error: () => {
        this.loading.set(false);
        this.notificationService.createErrorNotification('Es ist ein Fehler aufgetreten. Probieren Sie es später erneut.');
      }
    });
  }
  protected readonly StatusEnum = StatusEnum;
  protected readonly ClaimEnum = ClaimEnum;
  loading: WritableSignal<boolean> = signal<boolean>(false);

  onFileSelected(event: any) {
    const fileList: File[] = event.target.files;

    for (const file of fileList) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.images.push(reader.result as string);
      };
    }
  }
}
