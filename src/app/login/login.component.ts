import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations : [
    trigger( 'AnimateTab',
      [
        state('delete',style({'background-color' : 'red'})),
        transition('* => void',animate(500,
          style({
            transform :'translateX(100px)',
            opacity :0
          }
          ))),
          transition('void => *',
          [style({
            transform :'translateX(-200px)',
            opacity :1
          })
            ,animate(500)])
      ]
    ),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(200px)'
        }),
        animate(500)
      ]),
      // transition('* => void', [
      //   animate(300, style({
      //     transform: 'translateX(100px)',
      //     opacity: 0
      //   }))
      // ])
    ]),
  ]
})
export class LoginComponent implements OnInit {
  loginEmpForm: FormGroup;
  constructor(public authService : AuthService,private snackBar: MatSnackBar,private _router: Router) { 
    
  }

  ngOnInit() {

    this.loginEmpForm = new FormGroup({
      'username': new FormControl(null),
      'password': new FormControl(null)
    });

    this.snackBar.open('Welcome', 'close', {
      duration: 10000,
    });

    this.authService.testCoreAPI().subscribe(
      (res) => {
        console.log(res.json());
      },
      (err)=>{
        console.log(err);
      }
    );
  }
  OnLoginClick()
  {
    this.authService.login(this.loginEmpForm.get('username').value,this.loginEmpForm.get('password').value)
    .subscribe(
      ( 
        response: any) => { 
          var res = response.json();
        //console.log(response.json());
        
      //  console.log( "decoded :"+ jwt_decode(res.access_token));
        sessionStorage.setItem('accessToken',res.access_token);
        sessionStorage.setItem('userName',res.userName);
        this.authService.SetAccessCodes();
        this.authService.isAdmin();
        this._router.navigate(['/']);
    }
      ,   
      (error: any) => { console.log(error) }
    )
     // console.log(this.loginEmpForm.value)
  }

}
