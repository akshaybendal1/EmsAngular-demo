import { Component, ViewChild } from '@angular/core';
import { HeaderService } from './services/header.service';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EMSAngularDemo';
  varToggle :any;
 
  constructor(private headerService :HeaderService){
    
  }
 
  
}
