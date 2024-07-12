import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { CompanyService } from '../service/company.service';
import { CompanyCreation } from '../shared/CompanyCreation';

@Component({
  selector: 'app-company-creation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './company-creation-dialog.component.html',
  styleUrl: './company-creation-dialog.component.scss'
})
export class CompanyCreationDialogComponent {

  constructor(private readonly formBuilder: NonNullableFormBuilder, private readonly companyService: CompanyService) { }

  companyCreationForm = this.formBuilder.group({
    companyName: this.formBuilder.control('', [Validators.required]),
    companyEmail: this.formBuilder.control('', [Validators.required, Validators.email])
  });

  onSubmit() {
    const newCompany: CompanyCreation = {
      name: this.companyCreationForm.controls.companyName.value,
      email: this.companyCreationForm.controls.companyEmail.value
    }
    this.companyService.createCompany(newCompany).subscribe();
  }
}
