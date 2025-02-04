import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCreationDialogComponent } from './company-creation-dialog.component';

describe('CompanyCreationDialogComponent', () => {
  let component: CompanyCreationDialogComponent;
  let fixture: ComponentFixture<CompanyCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyCreationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
