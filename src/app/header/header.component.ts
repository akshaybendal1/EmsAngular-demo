import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import 'hammerjs';
import { ElementAst } from '@angular/compiler';
import { AuthService } from '../services/auth.service';
import { MatIconRegistry, MatDrawer } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { HeaderService } from '../services/header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token : boolean =false;
  username : string;
  @ViewChild(MatDrawer) drawer :MatDrawer;
  constructor(private _router: Router,public authService : AuthService,private headerService : HeaderService) { 
  
   
  }
  onMenuClick()
  {
this.drawer.toggle();
  }
  ngOnInit() {
    
    if(isNullOrUndefined(sessionStorage.getItem('accessToken'))){
      this.token = true;
     
    }
    else{
      this.token = false;
     
    }
    this.username =sessionStorage.getItem('userName');
  }
  OnLogoutClick()
  {
    this.token = false;
    this.authService.employeeAccess =0;
    this.authService.departmentAccess =0;
    this.authService.hasAdminRights = false;
    this.authService.userRole = "";
    this.authService.username ="";
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userName');
    this.username = "";
    this._router.navigate(['login']);
  }
}
