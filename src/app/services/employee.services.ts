import { Employee} from '../Models/employee.model'
import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { CachedHttp } from 'angular-async-cache';
import { HttpHeaders } from '@angular/common/http';

//import 'rxjs/Rx';


@Injectable()
export class EmployeeService {
    public employeeList: Employee[] = [new Employee('Sameer', 1, 'Amaravati', 70000),
    new Employee('Karuna', 2, 'Sonavade', 70000)];
    baseUrl: string = "http://localhost:60147/api/Employees/";
    constructor(public http: Http) {

    }

    public getAllEmployees() {
        var reqHeader = new Headers({ 
            'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken') });
         return this.http.get(this.baseUrl, { headers: reqHeader }).subscribe(
            (response: any) => {
              this.employeeList.length;
              this.employeeList = response.json();
              //console.log(this.employeeList)
            },
            (error) => console.log(error)
          );
          
    }
    getAllEmployeesFromAPI() {
        //console.log(sessionStorage.getItem('accessToken') );
        var reqHeader = new Headers({ 
            'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken') });
        return this.http.get(this.baseUrl, { headers: reqHeader })
        //.pipe().interval(1000)
        // .map(
        //      (res : any) => {
        //         const data = res.json();
        //       return data;
              
        //      }
        //  )
        
        
        
    }

    

    addEmployee(employee: any) {
        //console.log(employee)
        var reqHeader = new Headers({ 
            'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken') });
        return this.http.post(this.baseUrl, employee, { headers: reqHeader });

    }
    getEmployee(id: number) {
        //console.log(id);
        var reqHeader = new Headers({ 
                                    'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken') });
        return this.http.get(this.baseUrl + id, { headers: reqHeader });

    }
    updateEmployee(employee: any) {
        //console.log(employee)
        var reqHeader = new Headers({ 
            'Authorization': 'Bearer '+  sessionStorage.getItem('accessToken') });
        return this.http.put(this.baseUrl + employee.Id, employee, { headers: reqHeader });

    }

    deleteEmployee(id: number) {
        var reqHeader = new Headers({ 
            'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken') });
        return this.http.delete(this.baseUrl + id,  { headers: reqHeader });

    }

}