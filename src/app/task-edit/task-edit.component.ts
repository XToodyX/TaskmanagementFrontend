import {Component, OnInit} from '@angular/core';
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
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {ClaimEnum} from '../shared/ClaimEnum';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, RouterLink],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent implements OnInit {

  taskId: number = 0;
  assignees: string[] = ['Sven Herrmann', 'Dominic Herrmann', 'Peter Parker'];
  images: string[] = [];

  constructor(private readonly taskService: TaskService,
              private formBuilder: NonNullableFormBuilder,
              readonly authService: AuthService,
              private route: ActivatedRoute) { }

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
      this.taskEditForm.controls['location'].setValue(task.location);
      this.taskEditForm.controls['creator'].setValue(task.creator);
      this.taskEditForm.controls['assignee'].setValue(task.assignee);
      if (task.status != undefined) {
        this.taskEditForm.controls['status'].setValue(task.status);
      }
      this.images = task.images;
      if (task.creationDate != null) {
        this.taskEditForm.controls['creationDate'].setValue(task.creationDate);
      }
    });
  }

  taskEditForm = this.formBuilder.group({
    subject: this.formBuilder.control('', [Validators.required]),
    description: this.formBuilder.control('', [Validators.required]),
    location: this.formBuilder.control(LadenEnum.Zentrale, [Validators.required]),
    creator: this.formBuilder.control('', [Validators.required]),
    assignee: this.formBuilder.control('', [Validators.required]),
    status: this.formBuilder.control(StatusEnum.Blockiert, [Validators.required]),
    creationDate: this.formBuilder.control('', [Validators.required])
  });

  onSubmit() {
    const task: TaskUpdate = {
      taskId: this.taskId,
      subject: this.taskEditForm.controls.subject.value,
      description: this.taskEditForm.controls.description.value,
      creator: this.taskEditForm.controls.creator.value,
      assignee: this.taskEditForm.controls.assignee.value,
      status: this.taskEditForm.controls.status.value,
      images: this.images
    };

    this.taskService.updateTask(task).subscribe(() => {});
  }
  protected readonly StatusEnum = StatusEnum;
  protected readonly ClaimEnum = ClaimEnum;

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
