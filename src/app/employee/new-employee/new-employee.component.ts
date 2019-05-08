import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.services';
import { Employee } from 'src/app/Models/employee.model'
import { trigger, style, state, transition, animate } from '@angular/animations';
import { from, empty } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar,MatSnackBarConfig  } from '@angular/material';
//import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
 
  styleUrls: ['./new-employee.component.css'],
  animations: [
    trigger('AnimateTab',
      [
        state('delete', style({ 'background-color': 'red' })),
        transition('* => void', animate(500,
          style({
            transform: 'translateX(100px)',
            opacity: 0
          }
          ))),
        transition('void => *',
          [style({
            transform: 'translateY(-200px)',
            opacity: 1
          })
            , animate(500)])
      ]
    ),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(200px)'
        }),
        animate(500)
      ]),
      // transition('* => void', [
      //   animate(300, style({
      //     transform: 'translateX(100px)',
      //     opacity: 0
      //   }))
      // ])
    ]),
  ]

})
export class NewEmployeeComponent implements OnInit {
  @Output() getChanges = new EventEmitter<{ data: string }>();
  createEmpForm: FormGroup;
  emp: any;
  employee: Employee;
  activeEmpId: number = 0;
  responseStatus: boolean = false;
  message: string;
  constructor(public empService: EmployeeService,private snackBar: MatSnackBar, private _route: ActivatedRoute, private _router: Router,private authService :AuthService) {

   
   }

  ngOnInit() {

    if (isNullOrUndefined(sessionStorage.getItem('accessToken'))) {
      this._router.navigate(['login']);
    }
    else {
      this.authService.SetAccessCodes();
      this.authService.isAdmin();
      this.createEmpForm = new FormGroup({
        'name': new FormControl(null),
        'location': new FormControl(null),
        'salary': new FormControl(null),
        'deptid': new FormControl(null)
      });
      this._route.paramMap.subscribe(
        paramMap => {
          const id = + paramMap.get('id');
          this.activeEmpId = id;
          if (!isNullOrUndefined(id) && !(id === 0))
            this.getEmployee(id);
        }
      );

    }
  }

  getEmployee(id) {
    this.empService.getEmployee(id).subscribe(
      response => {

        this.emp = response.json();
        this.createEmpForm.setValue({
          'name': this.emp.Name,
          'location': this.emp.Location,
          'salary': this.emp.Salary,
          'deptid': this.emp.DeptId
        });// = response.json().name; 

        console.log(response.json());
        console.log(this.emp.Name)
      },
      error => {
        console.log(error)
      }
    )

  }

  OnUpdateClick() {
    this.employee = new Employee(
      this.createEmpForm.get('name').value,
      this.createEmpForm.get('deptid').value,
      this.createEmpForm.get('location').value,
      this.createEmpForm.get('salary').value
      );
    this.employee.Id = this.activeEmpId;
    this.empService.updateEmployee(this.employee).subscribe(

      (response: any) => {
        console.log(response)
        this.responseStatus = true;
        this.message = response.text();

        let config = new MatSnackBarConfig();
        config.panelClass = ['mat-simple-snackbar'];
        this.snackBar.open(this.message + '', 'close', {
          duration: 2000,
        });
        this.getChanges.emit({ data: "f" });
      },
      (error: any) => { console.log(error) }

    );
  }
  OnAddClick() {
    this.empService.addEmployee(new Employee(this.createEmpForm.get('name').value,
      this.createEmpForm.get('deptid').value,
      this.createEmpForm.get('location').value,
      this.createEmpForm.get('salary').value
    )).subscribe(

      (response: any) => {
        console.log(response)
        this.responseStatus = true;
        this.message = response.text();
        let config = new MatSnackBarConfig();
        config.panelClass = ['mat-simple-snackbar'];
        this.snackBar.open(this.message +'' , 'close', {
          duration: 10000,
          verticalPosition :"top"
        });
        this.getChanges.emit({ data: "f" });
        //this.createEmpForm.reset();
        //this._router.navigate(['employee']); 
      },
      (error: any) => { console.log(error) }

    );
    console.log(this.createEmpForm);
  }
  CloseAlert() {
    this.responseStatus = false;
    
  }
  OnCancelClick() { 
      this.createEmpForm.reset(); 
      this.activeEmpId = 0;
      
      //this._router.navigate(['employee']);
    }

}
