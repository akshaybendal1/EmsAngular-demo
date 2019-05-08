import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { getElementDepthCount } from '@angular/core/src/render3/state';
import { DepartmentService } from './services/department.service';

@Injectable()
@Pipe(
    {
        name : 'dept'
    }
)
export class dept implements PipeTransform{
    constructor(private deptservice : DepartmentService){}
    async transform(value :string){

        var val = +value;
       
       var res ;
    //    return this.deptservice.getEmployee(val).subscribe(
    //     res => {
    //         console.log(res.json().Name)
    //         res.json().Name
    //     }
    //    );
    this.deptservice.getEmployee(val)
    .toPromise()
    .then(response => {
        console.log(response.json())
        res = response.json()
        
    });
    console.log(res)
    return res.Name;
        
        
    }
}