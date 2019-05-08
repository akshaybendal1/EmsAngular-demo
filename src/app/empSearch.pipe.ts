import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { getElementDepthCount } from '@angular/core/src/render3/state';
import { EmployeeService } from './services/employee.services';
import { Employee } from './Models/employee.model';

@Injectable()
@Pipe(
    {
        name : 'dept'
    }
)
export class dept implements PipeTransform{
    constructor(private empService : EmployeeService ){}
    async transform(value :Employee[]){
        //value.filter()
    }
}