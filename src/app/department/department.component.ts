import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { DepartmentService } from '../services/department.service';
import { Department } from '../Models/department.model';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  
  styleUrls: ['./department.component.css'],
  animations : [
    trigger( 'AnimateTab',
      [
        state('delete',style({'background-color' : 'red'})),
        transition('* => void',animate(500,
          style({
            transform :'translateX(100px)',
            opacity :0
          }
          ))),
          transition('void => *',
          [style({
            transform :'translateX(-200px)',
            opacity :1
          })
            ,animate(500)])
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
export class DepartmentComponent implements OnInit {
  responseStatus : boolean = true; 
  activeEmpId: number = 0;
  departmentList: Department[] = [];
  constructor(private _router : Router,private deptService : DepartmentService,private authService : AuthService) { }
  createDeptForm: FormGroup;
  ngOnInit() {
    if(isNullOrUndefined(sessionStorage.getItem('accessToken')))
    {
      this._router.navigate(['login']);
    }
    else{
      this.authService.SetAccessCodes();
      this.authService.isAdmin();
      this.createDeptForm = new FormGroup({
        'dname': new FormControl(null),
        'dlocation': new FormControl(null),
        
      });
      this.deptService.getAllDepartmentsFromAPI()
      .subscribe(
        (res : any) => {
          this.departmentList = res.json();
        }
      )
    }
  }
  OnDeleteClick(id: number) {
    this.deptService.deleteDepartment(id).subscribe(

      (response: any) => {
        console.log(response)
        this.deptService.getAllDepartmentsFromAPI().subscribe(
          (res : any) => {
            this.departmentList = res.json();
          }
        )
      },
      (error: any) => { console.log(error)
       
      }

    );

  }
  OnAddClick()
  {
    this.deptService.addDepartment(new Department(this.createDeptForm.get('dname').value,
      this.createDeptForm.get('dlocation').value,
     
    )).subscribe(

      (response: any) => { console.log(response)
      this.responseStatus=false;
      this.deptService.getAllDepartmentsFromAPI()
      .subscribe(
        (res : any) => {
          this.departmentList = res.json();
        }
      )
      //this.message= response.text() ;
      //this.createEmpForm.reset();
      //this._router.navigate(['employee']); 
    },
      (error: any) => { console.log(error) }

    );
    console.log(this.createDeptForm);
  }
  CloseAlert()
  {
    this.responseStatus=true;
  }
 
}
