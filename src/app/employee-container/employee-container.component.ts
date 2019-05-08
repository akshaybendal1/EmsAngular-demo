import { Component, OnInit } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { EmployeeService } from '../services/employee.services';
import { Response } from '@angular/http';

import { trigger, style, state, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-employee-container',
  templateUrl: './employee-container.component.html',
  styleUrls: ['./employee-container.component.css'],
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
            transform: 'translateX(100px)',
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
export class EmployeeContainerComponent implements OnInit {
  SearchKey : string ="";
  constructor(private empService: EmployeeService,private snackBar: MatSnackBar) { }
  employeeList: Employee[]=[];
  ngOnInit() {
    this.getEventChildEvent();
    this.snackBar.open('Hello...', 'close', {
      duration: 10000,
    });
  }
  OnFilterClick($event)
  {
    this.SearchKey= ($event.target).value
    console.log(this.SearchKey);
    this.getEventChildEvent();
  }
  getEventChildEvent(){
    this.empService.getAllEmployeesFromAPI().subscribe(
      (response: Response) => {
       
        this.employeeList = response.json().filter(singleItem =>
        
        (singleItem.Name.toLowerCase().includes(this.SearchKey.toLowerCase())
         || singleItem.Location.toLowerCase().includes(this.SearchKey.toLowerCase())
         || String(singleItem.Salary).toLowerCase().includes(this.SearchKey.toLowerCase())
         || String(singleItem.DeptId).toLowerCase().includes(this.SearchKey.toLowerCase()))
        // 
        );

        //sort
        //this.sort()
       
      },
      (error) => console.log(error)
    );
  }

 
}
