import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.services';
import { Subject, interval, timer } from 'rxjs';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { Observable } from 'rxjs/Observable';
import { switchMap, takeUntil, catchError, flatMap } from 'rxjs/operators';
import 'rxjs/add/operator/takeWhile';
import { Employee } from '../Models/employee.model';
import { EmployeeServiceCache } from '../services/employee-cache.service';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-employee-data-table',
  templateUrl: './employee-data-table.component.html',
  styleUrls: ['./employee-data-table.component.css']
})
export class EmployeeDataTableComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Name', 'DeptId', 'Location', 'Salary'];
  dataSource = new MatTableDataSource<Employee>(eList);


  constructor(private empService: EmployeeServiceCache, private authService: AuthService) {
    this.empList = IntervalObservable.create(2000).pipe(
      flatMap(
        () => {
          return this.empService.getAllEmployeesFromAPI();
        })
    );
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  empList: Observable<any>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  // dtTrigger: Subject = new Subject();


  interval: any;
  alive = true;
  ngOnDestroy() {
    this.alive = false; // switches your IntervalObservable off
    // this.interval.unsubscribe();
  }


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.authService.SetAccessCodes();
    this.authService.isAdmin();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.refreshData();


  }
  refreshData() {
    console.log("Refresh Called ");
    this.empService.getAllEmployeesFromAPI().subscribe(
      (res: any) => {
        this.empList = res.json();
        eList = res.json();

        //  this.dataSource = res.json();
        //  this.dataSource.paginator = this.paginator;
        this.dtTrigger.next();
      },
      (err: any) => {
        console.log(err.text());
      }
      ,
      () => {
        //setTimeout(() => this.dataSource.paginator = this.paginator);
        //  this.dataSource.paginator = this.paginator;
      }
    );
  }

  ngAfterViewInit() {

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
var eList: Employee[] = [
  // { Id: 1, Name: 'Akshay', DeptId: 1, Location: 'Chembur', Salary: 450000 },
  // { Id: 2, Name: 'Rohan', DeptId: 1, Location: 'Chembur', Salary: 450000 },
  // { Id: 3, Name: 'Deepak', DeptId: 1, Location: 'Chembur', Salary: 450000 },
  // { Id: 4, Name: 'Abhiraj', DeptId: 1, Location: 'Chembur', Salary: 450000 },
  // { Id: 5, Name: 'Vishal', DeptId: 1, Location: 'Chembur', Salary: 450000 },
  // { Id: 6, Name: 'Amey', DeptId: 1, Location: 'Chembur', Salary: 450000 },
  // { Id: 7, Name: 'Vikrant', DeptId: 1, Location: 'Chembur', Salary: 450000 },
  // { Id: 8, Name: 'Sameer', DeptId: 1, Location: 'Chembur', Salary: 450000 },
  // { Id: 9, Name: 'Santosh', DeptId: 1, Location: 'Chembur', Salary: 450000 },
  // { Id: 10, Name: 'Jagdish', DeptId: 1, Location: 'Chembur', Salary: 450000 },

];