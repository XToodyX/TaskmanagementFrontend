import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-task-creation',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatCardModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './task-creation.component.html',
  styleUrl: './task-creation.component.scss'
})
export class TaskCreationComponent {

  taskCreationForm = this.formBuilder.group({
    betreff: this.formBuilder.control('', [Validators.required]),
    beschreibung: this.formBuilder.control('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  onSubmit(): void {
    console.log('Your order has been submitted', this.taskCreationForm.value);
  }

  routeTaskList() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.router.navigate(['../taskList']).then(() => {});
  }
}
