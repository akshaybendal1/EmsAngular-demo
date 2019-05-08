import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../services/employee.services';
import { Employee } from '../Models/employee.model';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { MatSnackBarConfig } from  '@angular/material';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { UpdateSheetComponent } from './update-sheet/update-sheet.component';
//import 'rxjs/Rx'
//import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  animations : [
    trigger( 'AnimateTab',
      [
        state('delete',style({'background-color' : 'red'})),
        transition('* => void',animate(1000,
          style({
           
            opacity :0
          }
          ))),
          transition('void => *',
          [style({
         
            opacity :1
          })
            ,animate(1000)])
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
          transform: 'translateY(100px)'
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
export class EmployeeComponent implements OnInit {
  p: number = 1;
  asc : boolean =true;
  interval:any;
 @Input() parentemployeeList : Employee[];
  tabState : string = 'one';
  employeeList: Employee[]=[];
  responseStatus: boolean = true;
  responseStatusError: boolean = true;

  constructor(public empService: EmployeeService, private _route: ActivatedRoute,private snackBar: MatSnackBar
    , private _router: Router,private authService : AuthService,private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    if(isNullOrUndefined(sessionStorage.getItem('accessToken')))
    {
      this._router.navigate(['login']);
    }
    else{
      this.authService.SetAccessCodes();
        this.authService.isAdmin();
      this.refreshData();
      this.interval = setInterval(() => { 
          this.refreshData(); 
      }, 50000);
    

    }
    
    
    //console.log(this.parentemployeeList);

  }

addClick()
{
  this.bottomSheet.open(NewEmployeeComponent);
}
  refreshData(){
    console.log("Refresh Called ");
    this.empService.getAllEmployeesFromAPI().subscribe(
      (response: Response) => {
        this.employeeList.length;
        this.employeeList = response.json();
      
       // console.log(this.employeeList)
      },  
      (error) => console.log(error)
    );
  }

  OnDeleteClick(id: number) {
    this.empService.deleteEmployee(id).subscribe(

      (response: any) => {
      //  console.log(response)
        this.empService.getAllEmployeesFromAPI().subscribe(
          (resp: Response) => {
            this.parentemployeeList = resp.json();
            this.employeeList = resp.json();
            this.responseStatus =false;
           let config = new MatSnackBarConfig();
        config.panelClass = ['mat-simple-snackbar'];
        this.snackBar.open( 'Success...', 'close', {
          duration: 2000,
        }); 
          }
        )
      },
      (error: any) => { console.log(error)
        this.responseStatusError = false
      }

    );

  }
  ngOnDestroy(){
  
  clearInterval( this.interval);
  }
  
  OnEditClick(id: number) {
   // console.log(id);
   
    this._router.navigate(['employee/', id]);
  }
  CloseAlert() {
    this.responseStatus = true;
  }
  CloseAlertError() {
    this.responseStatusError = true;
  }
  //sorting
  sort($event){
    
    
    //console.log(this.asc);
    if(this.asc)
    {
    this.asc =!this.asc
    this.parentemployeeList = this.parentemployeeList.sort(function(obj1,obj2){
      let val1 = obj1[($event.target).innerHTML];
      console.log(val1 +" : "+isNaN(val1));
      if(!isNaN(val1))
      {
      return obj1[($event.target).innerHTML] < obj2[($event.target).innerHTML]? 1 : -1;
      }
      else{
        return obj1[($event.target).innerHTML].toLowerCase() < obj2[($event.target).innerHTML].toLowerCase() ? 1 : -1;
      }
    });
 
  }
  else{
    this.asc =!this.asc
    this.parentemployeeList = this.parentemployeeList.sort(function(obj1,obj2){
      let val1 = obj1[($event.target).innerHTML];
      console.log(val1 +" : " + isNaN(val1));
      if(!isNaN(val1))
      {
      return obj1[($event.target).innerHTML] > obj2[($event.target).innerHTML]? 1 : -1;
      }
      else{
        return obj1[($event.target).innerHTML].toLowerCase() > obj2[($event.target).innerHTML].toLowerCase() ? 1 : -1;
      }
    });
    
  }
  }
 
}
