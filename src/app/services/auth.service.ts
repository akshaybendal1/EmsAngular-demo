import { Employee } from '../Models/employee.model'
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
//import { Observable } from 'rxjs';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class AuthService {
    reqHeader = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    hasAdminRights : boolean =false;
    employeeAccess:number;
    departmentAccess:number;
    userRole:string;
    username : string;
    //reqHeader = new Headers({ 'Content-Type': 'application/json' });
    constructor(private httpService: Http) {

    }
    public register(username: string, password: string) {
        return this.httpService.post('http://localhost:60147/api/account/register', {
            'email': username,
            'password': password,
            'confirmPassword': password
        }
        );
    }
    public isAuthenticated() {
        return sessionStorage.getItem('accessToken') != null;
    }
    public login(uname: string, pass: string) {

        console.log(this.reqHeader);

        var userData = "username=" + uname + "&password=" + pass + "&grant_type=password";
        var reqHeader = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });

        return this.httpService.post('http://localhost:60147/token', userData, { headers: reqHeader });

        // return this.httpService.post('http://localhost:60147/token', {
        //     'username' : 'test1@test.com',
        //     'password' : 'Test@1234',
        //     'grant_type' : 'password'
        // }
        // ,
        // { headers : this.reqHeader  }   

        // );
    }

    public SetAccessCode(module :string)
    {
        this.username =sessionStorage.getItem('userName');
        this.httpService.get('http://localhost:60147/api/UserRoles', {
            params: {
                email: sessionStorage.getItem('userName'),
                module:module
            }
        }).subscribe(
            (res) => {
              
              console.log("roles "+ res.json());
             
              for (let entry of res.json()) {
                  console.log("AccessRight");
                  if(module == 'Employee')
                  this.employeeAccess =entry.AccessRight;
                  else
                  this.departmentAccess =entry.AccessRight;
                  }
              }
          
          );
    }
    public SetAccessCodes()
    {
        this.SetAccessCode('Employee');
        this.SetAccessCode('Department');
    }

    public isAdmin() {
        var userData = "email=" + sessionStorage.getItem('userName');
        var roles;
        this.httpService.get('http://localhost:60147/api/UserRoles', {
            params: {
                email: sessionStorage.getItem('userName')
            }
        }).subscribe(
            role => {
                console.log(" is adminn"+role.json());
                roles = role.json();
                for (let entry of roles) {
                  //  console.log(entry);
                    this.userRole = entry.NAME
                    if (entry.NAME == "Admin") {
                        //console.log(entry.NAME);
                        
                        this.hasAdminRights = true;
                    }
                }
            }
        );
    }
    public getWCFData() {
        // var reqHeader = new Headers({ 'Content-Type': 'application/json' });

        // return this.httpService.get('http://localhost:1678/Service1.svc/Students', { headers: reqHeader });

        var reqHeader = new Headers({ 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWtzaGF5IiwibmJmIjoxNTUyNDYxNzYxLCJleHAiOjE1NTI0NjUzNjF9.65V2FQc1qyQ6324lEyk3vNEF9NgEEfDip11QvjRX09k'});
        return this.httpService.get('http://localhost:51112/api/values/', { headers: reqHeader });
    }

    public testCoreAPI()
    {
        var reqHeader = new Headers({ 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWtzaGF5IiwibmJmIjoxNTUyNDYxNzYxLCJleHAiOjE1NTI0NjUzNjF9.65V2FQc1qyQ6324lEyk3vNEF9NgEEfDip11QvjRX09k'});
        return this.httpService.get('http://localhost:51112/api/values/', { headers: reqHeader });
    }
}

