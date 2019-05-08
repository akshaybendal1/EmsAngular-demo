import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MatIconRegistry } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeService} from './services/employee.services';
import { HttpModule } from '@angular/http';
import { NewEmployeeComponent } from './employee/new-employee/new-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { RegistrationComponent } from './registration/registration.component';
import { DepartmentService } from './services/department.service';
import { dept } from './dept.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { EmployeeContainerComponent } from './employee-container/employee-container.component';
import { EmployeeDataTableComponent } from './employee-data-table/employee-data-table.component';
import { DataTablesModule } from 'angular-datatables';
import { UpdateSheetComponent } from './employee/update-sheet/update-sheet.component'
import {HttpClient, HttpClientModule } from '@angular/common/http';
import {MatInputModule, MatDatepickerModule,MatNativeDateModule, MatCardModule, MatChipsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSidenavModule, MatListModule, MatExpansionModule} from  '@angular/material'

import {
  AsyncCache,
  LocalStorageDriver,
  MemoryDriver,
  AsyncCacheModule,
  AsyncCacheOptions,
  CachedHttp
} from 'angular-async-cache';
import { EmployeeServiceCache } from './services/employee-cache.service';

import {
  
  MatBottomSheetModule,
  MatIconModule,
  MatRadioModule,
  MatSnackBarModule,
  MatButtonModule
  
} from '@angular/material';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { Home2Component } from './home2/home2.component';
import { HeaderService } from './services/header.service';





export function asyncCacheOptionsFactory(): AsyncCacheOptions {
  return new AsyncCacheOptions({
    // Default cache driver to use. Default in memory.
    // You can also roll your own by implementing the CacheDriver interface
    driver: new LocalStorageDriver(),
 
    // this is the special sauce - first emit the data from localstorage,
    // then re-fetch the live data from the API and emit a second time.
    // The async pipe will then re-render and update the UI. Default: false
    fromCacheAndReplay: true
  });
}

//routs : Routes = [ { }]
const appRoutes =
[
  { path : 'employee', component : EmployeeComponent},
{ path : 'employee1', component : EmployeeContainerComponent},
{ path : 'department', component : DepartmentComponent},
{ path : 'employee/create', component : NewEmployeeComponent},
{ path : 'employee/:id', component : NewEmployeeComponent},
{ path : 'login', component : LoginComponent},
{ path : 'register', component : RegistrationComponent},
{ path : 'employeeDataTable', component : EmployeeDataTableComponent},
{ path : 'MaterialAddEmployee', component : AddEmployeeComponent},
{ path : 'Home2', component : Home2Component},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeComponent,
    DepartmentComponent,
    NewEmployeeComponent,
    LoginComponent,
    UpdateSheetComponent,
    RegistrationComponent,
    dept,
    EmployeeContainerComponent,
    EmployeeDataTableComponent,
    AddEmployeeComponent,
    Home2Component
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,

    RouterModule.forRoot(appRoutes),
    AsyncCacheModule.forRoot({
      provide: AsyncCacheOptions,
      useFactory: asyncCacheOptionsFactory
    }),
    
    
    MatBottomSheetModule,
    
    MatIconModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports:[
    
  ]
  ,
  providers: [ EmployeeService,AuthService,DepartmentService,EmployeeServiceCache,HeaderService,DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
  }

}
