import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { Http,Headers } from '@angular/http';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/Rx';


@Injectable()
export class EmployeeServiceCache {
    public employeeList: Employee[] = [];
    baseUrl: string = "http://localhost:60147/api/Employees/";
    constructor(public http: Http) {

    }
    getAllEmployeesFromAPI() {
        var reqHeader = new Headers({ 
            'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken') });
        return this.http.get(this.baseUrl, { headers: reqHeader });      
    }
}