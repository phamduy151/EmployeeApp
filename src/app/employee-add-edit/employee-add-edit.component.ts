import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss'],
})
export class EmployeeAddEditComponent implements OnInit {
  employeeForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  constructor(
    private formBuilder: FormBuilder,
    public employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this.formBuilder.group({
      firstname: '',
      lastname: '',
      dob: '',
      gender: '',
      company: '',
      education: '',
      experience: '',
      salary: '',
      email: '',
    });
  }
  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.data) {
        this.employeeService
          .updateEmployee(this.data.id, this.employeeForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Employee update successfully');
              this.dialogRef.close(true);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this.employeeService.addEmployee(this.employeeForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added successfully');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
