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

@Component({
  selector: 'app-update-sheet',
  templateUrl: './update-sheet.component.html',
  styleUrls: ['./update-sheet.component.css']
})
export class UpdateSheetComponent implements OnInit {

  
  constructor(public empService: EmployeeService,private snackBar: MatSnackBar, private _route: ActivatedRoute, private _router: Router,private authService :AuthService) {

   
   }

  ngOnInit() {

    
  }

  getEmployee(id) {
    

  }

  OnUpdateClick() {
   
  }
  CloseAlert() {
   
  }
  OnCancelClick() { 
  
    }


}
