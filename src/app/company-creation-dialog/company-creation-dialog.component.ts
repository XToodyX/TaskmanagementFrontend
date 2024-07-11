import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-company-creation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './company-creation-dialog.component.html',
  styleUrl: './company-creation-dialog.component.scss'
})
export class CompanyCreationDialogComponent {

}
