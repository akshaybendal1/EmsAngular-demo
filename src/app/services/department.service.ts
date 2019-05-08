import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { Department } from '../Models/department.model';

@Injectable()
export class DepartmentService {
    departmentList: Department[] = [];
    baseUrl: string = "http://localhost:60147/api/Department/";

    constructor(private http : Http){

    }
    getAllDepartmentsFromAPI() {
        //console.log(sessionStorage.getItem('accessToken') );
        var reqHeader = new Headers({ 
            'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken') });
        return this.http.get(this.baseUrl, { headers: reqHeader })
       
    }
    deleteDepartment(id: number) {
        var reqHeader = new Headers({ 
            'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken') });
        return this.http.delete(this.baseUrl + id,  { headers: reqHeader });

    }
    addDepartment(department: any) {
        //console.log(employee)
        var reqHeader = new Headers({ 
            'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken') });
        return this.http.post(this.baseUrl, department, { headers: reqHeader });

    }
     getEmployee(id: number) {
        //console.log(id);
        var reqHeader = new Headers({ 
                                    'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken') });
        return this.http.get(this.baseUrl + id, { headers: reqHeader });

    }
    getEmployeeName(id: number) {
        //console.log(id);
        var reqHeader = new Headers({ 
                                    'Authorization': 'Bearer '+ sessionStorage.getItem('accessToken') });
        return this.http.get(this.baseUrl + id, { headers: reqHeader }).subscribe(
            (res : any ) => {
              
                 res.json()
              
                
            },
            (error :any) =>{
                  
                  
            }
        );

    }
}